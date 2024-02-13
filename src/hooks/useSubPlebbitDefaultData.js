import { useState, useEffect } from 'react';
import { defaultSub } from '../store/data';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);
  const subplebbits = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/multisub.json'
      ).then((res) => res.json());
      setValue(response.subplebbits);
    } catch (error) {
      console.warn(error);
      setValue(defaultSub.subplebbits);
    }
  };
  useEffect(() => {
    subplebbits();
  }, []);

  return value;
};
export default useSubPlebbitDefaultData;
