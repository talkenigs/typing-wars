import { Room, User } from '@typing-wars/types';
import { useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { io } from 'socket.io-client';
import { useGameContext } from '../context/GameProvider';

const URL =
  process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

const socket = io(URL);

const useSocket = () => {
  const { setUser } = useAuthContext();
  const { setRoom } = useGameContext();

  useEffect(() => {
    const onConnect = () => {
      console.log('connecting');
    };

    const userLoggedIn = (user: User) => {
      setUser(user);
    };

    const updateRoom = (room: Room) => {
      setRoom(room);
    };

    const onError = (error: Error) => {
      console.log('error', error);
    };

    const onDisconnect = () => {
      console.log('disconnected');
    };

    socket.on('connect', onConnect);

    socket.on('userLoggedIn', userLoggedIn);

    socket.on('roomUpdated', updateRoom);

    socket.on('connect_error', onError);

    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect');
      socket.off('disconnect', onDisconnect);
      socket.off('updateProgress');
    };
  }, []);

  return { socket };
};

export default useSocket;
