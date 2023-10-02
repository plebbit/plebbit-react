import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);
  const subplebbits = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/subplebbits.json',
        { cache: 'no-cache' }
      );

      if (response.ok) {
        const data = await response.json();
        setValue(data);
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
      setValue([
        {
          title: 'Test sub',
          address: '12D3KooWG3XbzoVyAE6Y9vHZKF64Yuuu4TjdgQKedk14iYmTEPWu',
        },
        {
          title: 'Test sub #2',
          address: '12D3KooWAdnytMQQMvAk8a6T7tLTCJCpcjh88FN25foambA5wYxP',
        },
        {
          address: 'meta.plebchan.eth',
        },
        {
          title: 'Plebbit Token',
          address: 'plebtoken.eth',
        },
        {
          title: 'Plebbit Lore',
          address: 'pleblore.eth',
        },
        {
          title: 'Brasilandia',
          address: 'brasilandia.eth',
        },
        {
          title: '/pol/',
          address: 'politically-incorrect.eth',
        },
        {
          title: '/biz/',
          address: 'business-and-finance.eth',
        },
        {
          address: 'movies-tv-anime.eth',
        },
        {
          address: 'plebmusic.eth',
        },
        {
          address: 'videos-livestreams-podcasts.eth',
        },
        {
          address: 'health-nutrition-science.eth',
        },
        {
          address: 'censorship-watch.eth',
        },
        {
          address: 'reddit-screenshots.eth',
        },
        {
          address: 'plebbit-italy.eth',
        },
        {
          title: 'Thrifty Plebs',
          address: '12D3KooWLiXLKwuWmfzwTRtBasTzDQVNagv8zU63eCEcdw2dT4zB',
        },
        {
          title: 'Plebs Helping Plebs',
          address: 'plebshelpingplebs.eth',
        },
        {
          title: 'Pleb Whales',
          address: 'plebwhales.eth',
        },
        {
          title: 'Anti Plebbit',
          address: 'antiplebbit.eth',
        },
        {
          title: 'Server of indecision',
          address: '12D3KooWNsRyNMfd1sn6TDztxmVnR13gD5Q4HnJiDzdm1qacGYJu',
        },
      ]);
    }
  };
  useEffect(() => {
    subplebbits();
  }, []);

  return value;
};
export default useSubPlebbitDefaultData;
