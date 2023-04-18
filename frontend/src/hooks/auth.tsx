import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useMemo,
} from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthData {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  // eslint-disable-next-line no-unused-vars
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  // eslint-disable-next-line no-unused-vars
  updateUser(user: User): void;
}

interface AuthProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@Gobarber:token');
    const user = localStorage.getItem('@Gobarber:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Gobarber:token', token);
    localStorage.setItem('@Gobarber:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Gobarber:token');
    localStorage.removeItem('@Gobarber:user');

    setData({} as AuthData);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Gobarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const value = useMemo(
    () => ({ user: data.user, signIn, signOut, updateUser }),
    [data.user, signIn, signOut, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('authContext must be on initialized');
  }

  return context;
}
