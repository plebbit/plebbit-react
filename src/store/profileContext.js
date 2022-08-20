import {
  useAccount,
  useAccounts,
  useAccountsActions,
  useAccountSubplebbits,
  useAuthorAvatarImageUrl,
  useSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import React, { createContext, useState, useEffect } from 'react';
import useSubPlebbitDefaultData from '../hooks/useSubPlebbitDefaultData';

export const ProfileContext = createContext();

export const ProfileDataProvider = (props) => {
  const { children } = props;
  const [reloadUser, setReloadUser] = useState(false);
  const [postStyle, setPostStyle] = useState('card');
  const [feedSort, setFeedSort] = useState('hot');
  const [showSplashcreen, setShowSplashcreen] = useState(true);
  const [device, setDevice] = useState('pc');
  const { exportAccount, createAccount, importAccount, setActiveAccount, setAccountsOrder } =
    useAccountsActions();
  const defaultAccount = useAccount();
  const accountLists = useAccounts();
  const profile = defaultAccount;
  const accountSubplebbits = useAccountSubplebbits();
  const subscriptions = useSubplebbits(defaultAccount?.subscriptions);
  const [homeAdd, setHomeAdd] = useState(
    [
      subscriptions
        ?.map((x) => {
          if (!x?.address) {
            return '';
          }
          return x?.address;
        })
        ?.filter((x) => x !== ''),
      ...Object.keys(accountSubplebbits),
    ]?.flat()
  );
  const subPlebbitData = useSubPlebbitDefaultData();
  const subPlebbitDefData = useSubplebbits(
    [
      subscriptions
        ?.map((x) => {
          if (!x?.address) {
            return '';
          }
          return x?.address;
        })
        ?.filter((x) => x !== ''),
      ...Object.keys(accountSubplebbits),
      subPlebbitData ? subPlebbitData?.map((x) => x?.address).filter(Boolean) : [],
    ].flat()
  );
  const { version } = require('../../package.json');
  const [postView, setPostView] = useState(
    homeAdd ? homeAdd : [homeAdd, subPlebbitDefData?.map((x) => x?.address)].flat()
  );
  const authorAvatarImageUrl = useAuthorAvatarImageUrl(profile?.author);
  const mode = window?.location?.protocol;

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setDevice('pc');
    } else if (window.innerWidth > 960 && window.innerWidth < 1200) {
      setDevice('tablet');
    } else {
      setDevice('mobile');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [device]);

  useEffect(() => {
    setHomeAdd(
      [
        subscriptions
          ?.map((x) => {
            if (!x?.address) {
              return '';
            }
            return x?.address;
          })
          ?.filter((x) => x !== ''),
        ...Object.keys(accountSubplebbits),
      ].flat()
    );
  }, [subscriptions]);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashcreen(false);
    }, 5000);
  }, [reloadUser]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setReloadUser,
        reloadUser,
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
        subscriptions,
        postView,
        setPostView,
        authorAvatarImageUrl,
        mode,
        homeAdd,
        subPlebbitDefData,
        subPlebbitData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
