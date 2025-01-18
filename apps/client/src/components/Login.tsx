import { useRef } from 'react';
import { useSocketContext } from '../context/SocketProvider';

const Login = () => {
  const { socket } = useSocketContext();
  const nameRef = useRef<HTMLInputElement>(null);

  const handleSignIn = () => {
    if (nameRef.current?.value) {
      socket?.emit('joined', { name: nameRef?.current?.value });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="">What's Your Name?</label>
      <input
        autoFocus
        type="text"
        className="p-2 border border-gray-300 rounded text-black"
        onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
        ref={nameRef}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded"
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </div>
  );
};

export default Login;
