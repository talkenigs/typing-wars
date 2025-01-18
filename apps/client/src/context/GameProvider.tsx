import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react';
import useEngine from '../hooks/useEngine';

type GameContextPayload = {
  words: any;
  typed: any;
  timeLeft: any;
  errors: any;
  state: any;
  restart: any;
  totalTyped: any;
  room: any;
  setRoom: any;
};

export const GameContext = createContext<GameContextPayload | null>(null);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('no context');
  }

  return context;
};

export const GameProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {
    words,
    typed,
    timeLeft,
    errors,
    state,
    restart,
    totalTyped,
    room,
    setRoom,
  } = useEngine();

  return (
    <GameContext.Provider
      value={{
        words,
        typed,
        timeLeft,
        errors,
        state,
        restart,
        totalTyped,
        room,
        setRoom,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
