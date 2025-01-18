import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react';
import { Socket } from 'socket.io-client';
import useSocket from '../hooks/useSocket';

type SocketContextPayload = {
  socket: Socket;
};
export const SocketContext = createContext<SocketContextPayload | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('no context');
  }

  return context;
};

export const SocketProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { socket } = useSocket();

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
