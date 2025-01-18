import { User } from '@typing-wars/types';
import {
  createContext,
  Dispatch,
  FunctionComponent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AuthContextPayload = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User>>;
};

export const AuthContext = createContext<AuthContextPayload | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('no context');
  }

  return context;
};

export const AuthProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
