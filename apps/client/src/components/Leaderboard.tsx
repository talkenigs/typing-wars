import { Room } from '@typing-wars/types';

const Leaderboard = ({ room }: { room: Room }) => {
  const usersNames = room.users.map((user) => {
    return <div key={user.name}>{user.name}</div>;
  });

  return <div>{usersNames}</div>;
};

export default Leaderboard;
