import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);
  const subplebbits = async () => {
    return fetch(
      'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/subplebbits.json',
      { cache: 'no-cache' }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          toast.error('error fetching default subs', {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          return [];
        }
      })
      .then((data) => {
        setValue(data);
      });
  };

  useEffect(async () => {
    await subplebbits();
  }, []);

  return value === [] ? [] : value;
};
export default useSubPlebbitDefaultData;
