import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketProvider';
import { GameProvider } from './context/GameProvider';
import Layout from './Layout';

const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <GameProvider>
          <Layout />
        </GameProvider>
      </AuthProvider>
    </SocketProvider>
  );
};

export default App;
