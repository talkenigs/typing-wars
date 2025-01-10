import { faker } from '@faker-js/faker';
import { useCallback, useState } from 'react';

const generateWords = (count: number) => {
  return Array.from({ length: count }, () => faker.word.noun())
    .join(' ')
    .toLowerCase();
};

const useWords = (count: number) => {
  const [words, setWords] = useState<string>(generateWords(count));

  const updateWords = useCallback(() => {
    setWords(generateWords(count));
  }, [count]);

  return { words, updateWords };
};

export default useWords;
