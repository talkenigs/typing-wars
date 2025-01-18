import { Room } from '@typing-wars/types';
import { motion } from 'framer-motion';
import { useGameContext } from '../context/GameProvider';

const Leaderboard = ({ room }: { room: Room }) => {
  const sortedUsers = [...room.users].sort((a, b) => b.progress - a.progress);
  const { state } = useGameContext();

  if (state !== 'finish') {
    return (
      <div className="space-y-2 mb-4">
        {sortedUsers.map((user) => (
          <div key={user.name} className="flex items-center space-x-2">
            <span className="font-bold text-slate-100">{user.name}:</span>
            <motion.div
              className="h-2 bg-blue-500 rounded-lg"
              style={{ width: `${user.progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${user.progress}%` }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 mb-4">
      <div className="text-center text-2xl font-bold">
        <span>Winner Is {sortedUsers[0].name}!</span>
      </div>
    </div>
  );
};

export default Leaderboard;
