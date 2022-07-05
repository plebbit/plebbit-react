import {
  useAccount,
  useAccounts,
  useAccountsActions,
  useAccountSubplebbits,
} from '@plebbit/plebbit-react-hooks';
import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileDataProvider = (props) => {
  const { children } = props;
  const [reloadUser, setReloadUser] = useState(false);
  const [postStyle, setPostStyle] = useState('card');
  const [feedSort, setFeedSort] = useState('hot');
  const [showSplashcreen, setShowSplashcreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [device, setDevice] = useState('pc');
  const { exportAccount, createAccount, importAccount, setActiveAccount, setAccountsOrder } =
    useAccountsActions();
  const defaultAccount = useAccount();
  const accountLists = useAccounts();
  const accountSubplebbits = useAccountSubplebbits();

  const profile = defaultAccount;

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
  }, []);

  const getProfileState = async () => {};

  const logUserOut = () => {};

  useEffect(() => {
    setTimeout(() => {
      setShowSplashcreen(false);
    }, 4000);
    getProfileState();
  }, [reloadUser]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setReloadUser,
        reloadUser,
        logUserOut,
        postStyle,
        setPostStyle,
        isLoggedIn,
        setIsLoggedIn,
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
