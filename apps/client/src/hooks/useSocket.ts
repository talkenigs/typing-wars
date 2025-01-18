import { useEffect } from 'react';
import { io } from 'socket.io-client';

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const socket = io(URL);

const useSocket = () => {
  useEffect(() => {
    const onConnect = () => {
      console.log('connecting');
    };

    const onError = (error: Error) => {
      console.log('error', error);
    };

    const onDisconnect = () => {
      console.log('disconnected');
    };

    socket.on('connect', onConnect);

    socket.on('connect_error', onError);

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect');
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { socket };
};

export default useSocket;
