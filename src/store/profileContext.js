import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileDataProvider = (props) => {
  const { children } = props;
  const [profile, setProfile] = useState({});
  const [reloadUser, setReloadUser] = useState(false);
  const [postStyle, setPostStyle] = useState('card');
  const [showSplashcreen, setShowSplashcreen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        setProfile,
        profile,
        setReloadUser,
        reloadUser,
        logUserOut,
        postStyle,
        setPostStyle,
        isLoggedIn,
        setIsLoggedIn,
        showSplashcreen,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};