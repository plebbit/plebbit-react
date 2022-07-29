import { useState, useEffect } from 'react';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);

  const subplebbits = async () =>
    fetch(
      'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/subplebbits.json'
    )
      .then((response) => response.json())
      .then((data) => {
        setValue(data);
      });

  useEffect(() => {
    subplebbits();
  }, []);

  return value;
};
export default useSubPlebbitDefaultData;
