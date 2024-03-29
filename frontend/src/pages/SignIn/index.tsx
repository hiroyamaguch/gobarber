import React, { useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, AnimationContent, Background } from './styles';

import Logo from '../../assets/logo.svg';

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        navigate('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Ocorreu um erro na autenticação',
          description: 'Verifique as credenciais novamente',
        });
      }
    },
    [signIn, addToast, navigate],
  );

  return (
    <Container>
      <Content>
        <AnimationContent>
          <img src={Logo} alt="Gobarber Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Logon</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
            <Link to="forgot-password">Esqueceu sua senha?</Link>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationContent>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
