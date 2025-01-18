import { useCallback, useEffect, useState } from 'react';
import { countErrors, debug } from '../utils/helpers';
import useCountdown from './useCountdown';
import useTypings from './useTypings';
import useWords from './useWords';
import { defaultRoom, Room } from '@typing-wars/types';
import { useSocketContext } from '../context/SocketProvider';
import { useAuthContext } from '../context/AuthContext';

export type State = 'start' | 'run' | 'finish';

const NUMBER_OF_WORDS = 7;
const COUNTDOWN_SECONDS = 30;

const useEngine = () => {
  const { socket } = useSocketContext();
  const { user } = useAuthContext();
  const [state, setState] = useState<State>('start');
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== 'finish'
  );
  const [errors, setErrors] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [room, setRoom] = useState<Room>(defaultRoom);

  const isStarting = state === 'start' && cursor > 0;
  const areWordsFinished = cursor === words.length;

  const restart = useCallback(() => {
    debug('restarting...');
    resetCountdown();
    resetTotalTyped();
    setState('start');
    setErrors(0);
    setTotalErrors(0);
    updateWords();
    clearTyped();
    resetProgress();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  const resetProgress = useCallback(() => {
    if (!user) {
      return;
    }
    socket.emit('updateProgress', { progress: 0, user });
  }, [user]);

  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors(totalErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // as soon the user starts typing the first letter, we start
  useEffect(() => {
    if (isStarting) {
      setState('run');
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // when the time is up, we've finished
  useEffect(() => {
    if (!timeLeft && state === 'run') {
      debug('time is up...');
      setState('finish');
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  /**
   * when the current words are all filled up,
   * we generate and show another set of words
   */
  useEffect(() => {
    if (areWordsFinished) {
      debug('words are finished...');
      setTotalErrors((prev) => prev + errors);
      updateWords();
      clearTyped();
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  useEffect(() => {
    if (!user) {
      return;
    }
    sumErrors();
    const progress = totalTyped - errors;
    socket.emit('updateProgress', { progress, user });
  }, [totalTyped]);

  return {
    state,
    words,
    typed,
    errors,
    restart,
    timeLeft,
    totalTyped,
    room,
    setRoom,
  };
};

export default useEngine;
