import { useColorMode } from '@chakra-ui/react';
import {
  useAccount,
  useNotifications,
  useAccounts,
  useAccountSubplebbits,
  useAuthorAvatar,
  useSubplebbits,
  exportAccount,
  createAccount,
  importAccount,
  setActiveAccount,
  setAccountsOrder,
  deleteAccount,
} from '@plebbit/plebbit-react-hooks';
import { setAccount } from "@plebbit/plebbit-react-hooks/dist/stores/accounts/accounts-actions"
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import useSubPlebbitDefaultData from '../hooks/useSubPlebbitDefaultData';
import getAddressFromArray from '../utils/getAddressFromArray';

export const ProfileContext = createContext();

export const ProfileDataProvider = (props) => {
  const { setColorMode, toggleColorMode } = useColorMode();
  const { children } = props;
  const [postStyle, setPostStyle] = useState('card');
  const [feedSort, setFeedSort] = useState('hot');
  const [showSplashcreen, setShowSplashcreen] = useState(true);
  const [device, setDevice] = useState('pc');
  const defaultAccount = useAccount();
  const { accounts: accountLists } = useAccounts();
  const profile = defaultAccount;
  const { accountSubplebbits } = useAccountSubplebbits();
  const [showSide, setShowSide] = useState(false);
  const userTheme = profile?.plebbitReactOptions?.darkMode;
  const notifications = useNotifications({ accountName: profile?.name });

  const toggleTheme = () => {
    toggleColorMode();
    setAccount({
      ...profile,
      plebbitReactOptions: {
        darkMode: !userTheme,
      },
    });
  };
  //account Subscription === obj[]
  const { subplebbits: subscriptions } = useSubplebbits({ subplebbitAddresses: defaultAccount?.subscriptions });



  const homeAdd = useMemo(() => {
    const subscriptionsAddresses = getAddressFromArray(subscriptions);
    const accountSubplebbitsAddresses = Object.keys(accountSubplebbits);
    return [...subscriptionsAddresses, ...accountSubplebbitsAddresses];
  }, [subscriptions, accountSubplebbits]);

  //git default subs === {...obj}
  const subPlebbitData = useSubPlebbitDefaultData();
  // account subscriptions &&  created subs && git default subs === obj[]
  const { subplebbits: subPlebbitDefData } = useSubplebbits({
    subplebbitAddresses: [
      getAddressFromArray(subscriptions),
      Object.keys(accountSubplebbits),
      getAddressFromArray(subPlebbitData),
    ].flat().filter(Boolean)
  });


  const { version } = require('../../package.json');
  const [postView, setPostView] = useState(
    homeAdd || getAddressFromArray(subPlebbitDefData)
  );
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const mode = window?.location?.protocol;
  const baseUrl = mode === 'https:' ? 'plebbitapp.eth.limo/#/' : `${window.origin}/#`;



  useEffect(() => {
    if (!postView?.length) {
      setPostView(homeAdd || getAddressFromArray(subPlebbitDefData))
    }

  }, [homeAdd])



  const handleResize = useCallback(() => {
    if (window.innerWidth > 1200) {
      setDevice('pc');
    } else if (window.innerWidth > 960 && window.innerWidth < 1200) {
      setDevice('tablet');
    } else {
      setDevice('mobile');
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    setColorMode(userTheme ? 'dark' : 'light');
  }, [userTheme]);



  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashcreen(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <ProfileContext.Provider
      value={ {
        profile,
        postStyle,
        setPostStyle,
        showSplashcreen,
        feedSort,
        setFeedSort,
        device,
        setDevice,
        accountLists,
        exportAccount,
        importAccount,
        setActiveAccount,
        setAccountsOrder,
        createAccount,
        accountSubplebbits,
        version,
        subscriptions: subscriptions?.filter((x) => x !== undefined),
        postView,
        setPostView,
        authorAvatarImageUrl,
        mode,
        homeAdd,
        subPlebbitDefData,
        subPlebbitData,
        showSide,
        setShowSide,
        baseUrl,
        setAccount,
        deleteAccount,
        toggleTheme,
        notifications,
      } }
    >
      { children }
    </ProfileContext.Provider>
  );
};
