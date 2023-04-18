import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${Platform.OS === 'android' ? 150 : 40}px 30px;
`;

export const HeadContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;
`;

export const BackButton = styled.TouchableOpacity`
`;

export const SignOutButton = styled.TouchableOpacity`
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin: 18px 0;
`;

export const UserAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  align-self: center;
  background: green;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #f4ede8;
`;
