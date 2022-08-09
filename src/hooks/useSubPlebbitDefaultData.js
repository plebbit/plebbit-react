import { useState, useEffect } from 'react';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);

  const subplebbits = async () =>
    fetch(
      'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/subplebbits.json',
      { cache: 'no-cache' }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        setValue(data);
      });

  useEffect(async () => {
    await subplebbits();
  }, []);

  return value;
};
export default useSubPlebbitDefaultData;
