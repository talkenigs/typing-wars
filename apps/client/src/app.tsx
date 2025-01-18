import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketProvider';
import { GameProvider } from './context/GameProvider';
import Layout from './Layout';

const App = () => {
  return (
    <AuthProvider>
      <GameProvider>
        <SocketProvider>
          <Layout />
        </SocketProvider>
      </GameProvider>
    </AuthProvider>
  );
};

export default App;
