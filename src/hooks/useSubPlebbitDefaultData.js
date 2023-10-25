import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const useSubPlebbitDefaultData = () => {
  const [value, setValue] = useState([]);
  const subplebbits = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/plebbit/temporary-default-subplebbits/master/multisub.json',
        { cache: 'no-cache' }
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
          tags: ['plebchan', 'web3'],
          features: ['sfw'],
        },
        {
          title: 'Plebbit Token',
          address: 'plebtoken.eth',
          tags: ['ethereum', 'eth', 'crypto'],
          features: ['sfw'],
        },
        {
          title: 'Plebbit Lore',
          address: 'pleblore.eth',
          tags: ['storytelling'],
          features: ['sfw'],
        },
        {
          title: 'Brasilandia',
          address: 'brasilandia.eth',
          tags: ['brazil'],
          features: ['sfw'],
        },
        {
          title: '/pol/',
          address: 'politically-incorrect.eth',
          tags: ['politics', 'news'],
        },
        {
          title: '/biz/',
          address: 'business-and-finance.eth',
          tags: ['crypto', 'defi', 'finance', 'business'],
        },
        {
          address: 'movies-tv-anime.eth',
          tags: ['movies', 'tv', 'anime'],
          features: ['sfw'],
        },
        {
          address: 'plebmusic.eth',
          tags: ['music'],
          features: ['sfw'],
        },
        {
          address: 'videos-livestreams-podcasts.eth',
          tags: ['podcast', 'video', 'livestream'],
        },
        {
          address: 'health-nutrition-science.eth',
          tags: ['health', 'fitness'],
          features: ['sfw'],
        },
        {
          address: 'censorship-watch.eth',
          tags: ['censorship', 'freespeech'],
        },
        {
          address: 'reddit-screenshots.eth',
          tags: ['reddit', 'funny'],
        },
        {
          address: 'plebbit-italy.eth',
          tags: ['italy'],
          features: ['sfw'],
        },
        {
          address: 'weaponized-autism.eth',
          tags: ['motivation', 'autism'],
        },
        {
          address: 'monarkia.eth',
        },
        {
          address: 'mktwallet.eth',
          tags: ['marketing', 'business'],
        },
        {
          address: 'pleblabs.eth',
        },
        {
          address: '💩posting.eth',
          tags: ['funny', 'meme'],
        },
        {
          address: 'bitcoinbrothers.eth',
        },
        {
          address: 'plebbrothers.eth',
        },
        {
          address: 'networkeconomics.eth',
          tags: ['networking'],
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
          title: 'Ask Plebbit',
          address: 'askplebbit.eth',
        },
        {
          title: 'Current Events',
          address: 'currentevents.eth',
          tags: ['politics', 'news'],
        },
        {
          title: 'So I Became Comfy',
          address: 'soibecamecomfy.eth',
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
