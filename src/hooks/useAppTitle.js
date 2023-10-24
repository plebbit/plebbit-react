import { useEffect } from 'react';
import useStore from '../store/useStore';

const useAppTitle = (value, control) => {
  const { setAppTitle } = useStore();

  useEffect(() => {
    setAppTitle(value);

    return () => {
      setAppTitle('plebbit');
    };
  }, [control] || []);

  return;
};

export default useAppTitle;
