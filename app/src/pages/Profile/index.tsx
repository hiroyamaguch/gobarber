import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  HeadContainer,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  Title,
  SignOutButton,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const { user, updateUser, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),

          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),

          old_password: Yup.string(),

          password: Yup.string().when('old_password', {
            is: (val: string) => val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),

          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: string) => val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null],
              'Confirmação de senha incorreta',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data.user);

        Alert.alert('Perfil Atualizado', 'Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        Alert.alert(
          'Erro ao atualizar o perfil',
          'Ocorreu um erro ao atulizar o perfil, tente novamente',
        );
      }
    },
    [navigation, updateUser],
  );

  const handlePickUpImage = useCallback((response) => {
    if (response.didCancel) {
      return;
    }
    if (response.error) {
      Alert.alert('Erro ao atualizar seu avatar.');
      return;
    }

    const data = new FormData();

    data.append('avatar', {
      type: 'image/jpg',
      name: `${user.id}.jpg`,
      uri: response.uri,
    });

    api.patch('users/avatar', data).then(reqResponse => {
      updateUser(reqResponse.data.user);
    });
  }, []);

  const handleAvatarChange = useCallback(() => {
    launchImageLibrary({mediaType: 'photo'}, handlePickUpImage);
  }, [user.id, updateUser]);

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <HeadContainer>
              <BackButton onPress={navigateBack}>
                <Icon name="chevron-left" size={18} color="#f4ede8"/>
              </BackButton>

              <Title>Meu Perfil</Title>

              <SignOutButton onPress={signOut}>
                <Icon name="power" size={18} color="#f4ede8"/>
              </SignOutButton>
            </HeadContainer>

            <UserAvatarButton onPress={handleAvatarChange}>
              <UserAvatar source={{ uri: user.avatar_url }} />
            </UserAvatarButton>

            <Form initialData={user} ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  newPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={newPasswordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordConfirmationInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordConfirmationInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={handleSubmitForm}
              />

              <Button onPress={handleSubmitForm}>Confirmar mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
