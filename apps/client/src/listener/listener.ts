import { Room, User } from '@typing-wars/types';
import { useAuthContext } from '../context/AuthContext';
import { useGameContext } from '../context/GameProvider';
import { useSocketContext } from '../context/SocketProvider';

const Listener = () => {
  const { socket } = useSocketContext();
  const { setUser } = useAuthContext();
  const { setRoom, restart } = useGameContext();

  const userLoggedIn = (user: User) => {
    setUser(user);
    restart();
  };

  const updateRoom = (room: Room) => {
    setRoom(room);
  };

  socket.on('userLoggedIn', userLoggedIn);
  socket.on('roomUpdated', updateRoom);
};

export default Listener;
