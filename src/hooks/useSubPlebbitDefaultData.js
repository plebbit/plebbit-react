import { useState, useEffect } from 'react';
import { defaultSub } from '../store/data';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);
  const subplebbits = async () => {
    try {
      const response = await fetch(
        'https://github.com/plebbit/temporary-default-subplebbits/blob/master/multisub.json'
      );

      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        setValue(data?.subplebbits);
      } else {
        toast.error('error fetching default subs', {
          position: 'bottom-center',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setValue([]);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred while fetching default subs', {
        position: 'bottom-center',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      setValue(defaultSub.subplebbits);
    }
  };
  useEffect(() => {
    subplebbits();
  }, []);

  return value;
};
export default useSubPlebbitDefaultData;
