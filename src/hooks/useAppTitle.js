import { useEffect } from 'react';
import useStore from '../store/useStore';
import { useLocation } from 'react-router-dom';

const useAppTitle = (value, control) => {
  const { setAppTitle } = useStore();
  const { pathname } = useLocation();

  useEffect(() => {
    setAppTitle(value);

    return () => {
      setAppTitle({ label: 'plebbit' });
    };
  }, [control, pathname]);

  return;
};

export default useAppTitle;
