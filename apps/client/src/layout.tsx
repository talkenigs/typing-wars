import React from 'react';
import GeneratedWords from './components/GeneratedWords';
import RestartButton from './components/RestartButton';
import Results from './components/Results';
import UserTypings from './components/UserTypings';
import Leaderboard from './components/Leaderboard';
import { calculateAccuracyPercentage } from './utils/helpers';
import Login from './components/Login';
import { useAuthContext } from './context/AuthContext';
import { useGameContext } from './context/GameProvider';
import Listener from './listener/listener';

const Layout = () => {
  const { user } = useAuthContext();

  const { words, typed, timeLeft, errors, state, restart, totalTyped, room } =
  useGameContext();

  Listener();

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Leaderboard room={room} />
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <RestartButton
        className={'mx-auto mt-10 text-slate-500'}
        onRestart={restart}
      />
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
      />
    </>
  );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
      {children}
    </div>
  );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
  return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

export default Layout;
