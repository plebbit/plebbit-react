import { useColorMode } from '@chakra-ui/react';
import { useAccount, useAccountSubplebbits, useSubplebbits } from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useCallback, useMemo } from 'react';
import useSubPlebbitDefaultData from '../hooks/useSubPlebbitDefaultData';
import getAddressFromArray from '../utils/getAddressFromArray';
import useStore from './useStore';

const ProfileDataProvider = ({ children }) => {
  const { setColorMode } = useColorMode();

  const {
    postView,
    setHomeAdd,
    setPostView,
    setSubPlebbitDefData,
    setSubPlebbitData,
    setShowSplashcreen,
    setDevice,
  } = useStore((state) => state);

  const profile = useAccount();
  const { accountSubplebbits } = useAccountSubplebbits();
  const userTheme = profile?.plebbitReactOptions?.darkMode;

  //account Subscription === obj[]
  const { subplebbits: subscriptions } = useSubplebbits({
    subplebbitAddresses: profile?.subscriptions,
  });

  const homeAdd = useMemo(() => {
    const subscriptionsAddresses = getAddressFromArray(subscriptions);
    const accountSubplebbitsAddresses = Object.keys(accountSubplebbits);
    return [...subscriptionsAddresses, ...accountSubplebbitsAddresses];
  }, [subscriptions, accountSubplebbits]);

  // Get default subs === {...obj}
  const subPlebbitData = useSubPlebbitDefaultData();

  // Combine account subscriptions, created subs, and default subs === obj[]
  const { subplebbits: subPlebbitDefData } = useSubplebbits({
    subplebbitAddresses: [
      getAddressFromArray(subscriptions),
      Object.keys(accountSubplebbits),
      getAddressFromArray(subPlebbitData),
    ]
      .flat()
      .filter(Boolean),
  });

  useEffect(() => {
    if (subPlebbitData) {
      setSubPlebbitData(subPlebbitData);
    }
  }, [subPlebbitData]);

  useEffect(() => {
    if (subPlebbitDefData) {
      setSubPlebbitDefData(subPlebbitDefData);
    }
  }, [subPlebbitDefData]);

  useEffect(() => {
    if (homeAdd) {
      setHomeAdd(homeAdd);
      if (!postView?.length) {
        setPostView(homeAdd || getAddressFromArray(subPlebbitDefData));
      }
    }
  }, [homeAdd, postView, subPlebbitDefData]);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 1200) {
      setDevice('pc');
    } else if (window.innerWidth > 960 && window.innerWidth < 1200) {
      setDevice('tablet');
    } else {
      setDevice('mobile');
    }
  }, [setDevice]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setColorMode(userTheme ? 'dark' : 'light');
  }, [setColorMode, userTheme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashcreen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [setShowSplashcreen]);

  return <div>{children}</div>;
};

ProfileDataProvider.defaultProps = {
  children: null,
};

export default ProfileDataProvider;
