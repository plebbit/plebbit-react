import { useAccount, useAccountSubplebbits, useSubplebbits } from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useCallback, useMemo } from 'react';
import useSubPlebbitDefaultData from '../hooks/useSubPlebbitDefaultData';
import getAddressFromArray from '../utils/getAddressFromArray';
import useStore from './useStore';

const ProfileDataProvider = React.memo(() => {
  const {
    setSubPlebbitDefData,
    setSubPlebbitData,
    setDevice,
    setColorMode,
    setMySubsAddresses,
    setAllSubsAddresses,
  } = useStore();

  const profile = useAccount();
  const { accountSubplebbits } = useAccountSubplebbits();
  const userTheme = profile?.plebbitReactOptions?.darkMode;

  //account Subscription === obj[]
  const { subplebbits: subscriptions } = useSubplebbits({
    subplebbitAddresses: profile?.subscriptions,
  });

  const mySubsAddresses = useMemo(() => {
    const subscriptionsAddresses = getAddressFromArray(subscriptions);
    const accountSubplebbitsAddresses = Object.keys(accountSubplebbits);
    return [...subscriptionsAddresses, ...accountSubplebbitsAddresses];
  }, [subscriptions, accountSubplebbits]);

  // Get default subs === {...obj}
  const subPlebbitData = useSubPlebbitDefaultData();

  // Combine account subscriptions, created subs, and default subs === obj[]
  const { subplebbits: subPlebbitDefData } = useSubplebbits({
    subplebbitAddresses: [
      ...getAddressFromArray(subscriptions),
      ...Object.keys(accountSubplebbits),
      ...getAddressFromArray(subPlebbitData),
    ].filter(Boolean),
  });

  useEffect(() => {
    if (subPlebbitData) {
      setSubPlebbitData(subPlebbitData);
    }
  }, [subPlebbitData]);

  // addresses of all subs related to me
  useMemo(() => setMySubsAddresses(mySubsAddresses), [mySubsAddresses]);
  // addresses of all subs
  useMemo(() => setAllSubsAddresses(getAddressFromArray(subPlebbitDefData)), [subPlebbitDefData]);

  useEffect(() => {
    if (subPlebbitDefData) {
      setSubPlebbitDefData(subPlebbitDefData);
    }
  }, [subPlebbitDefData]);

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

  return <div />;
});

export default ProfileDataProvider;
