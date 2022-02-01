import React, { createContext, useState, useEffect } from 'react';

export const ProfileContext = createContext();

export const ProfileDataProvider = (props) => {
  const { children } = props;
  const [profile, setProfile] = useState({});
  const [reloadUser, setReloadUser] = useState(false);
  const [postStyle, setPostStyle] = useState('card');

  const getProfileState = async () => {};

  const logUserOut = () => {};

  useEffect(() => {
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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
