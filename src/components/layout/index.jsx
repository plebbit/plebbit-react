import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import NavBar from './Nav';
import { PlebLogo } from '../svgs';
import { MdClose } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { useAccount, useNotifications } from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import styles from './layout.module.css';
import { SideMenu } from './Nav/DropDown/homeDropdown';
import CreateSubPlebbit from './Nav/modal/CreateSubPlebbit';
import ImportAccount from './Nav/modal/importAccount';

const Layout = ({ children, name, stateString, background }) => {
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });
  const {
    showSplashcreen,
    device,
    showSide,
    setShowSide,
    showImportAccountModal,
    showCreateSubModal,
  } = useStore((state) => state);
  const location = useLocation();
  const showStyleBar = location?.search === '?styling=true';

  if (showSplashcreen) {
    return (
      <div className={styles.splash_wrapper}>
        <div className={styles.splash}>
          <PlebLogo />
        </div>
      </div>
    );
  }

  const unreadNotificationsCount =
    notifications?.notifications?.filter((x) => !x?.markedAsRead).length || 0;

  document.title = `${unreadNotificationsCount ? `(${unreadNotificationsCount}) ` : ''}${
    name?.label || 'plebbit'
  }`;

  console.log({ showCreateSubModal });
  return (
    <>
      <div className={styles.wrapper}>
        <div tabIndex="-1" />
        <div className={styles.wrapper2}>
          <NavBar showStyleBar={showStyleBar} location={name} />
          {device !== 'mobile' ? (
            <div>
              <div className={styles.wrapper3} showSide={String(showSide)}>
                {showSide && (
                  <div className={styles.sidemenu_wrap}>
                    <div className={styles.sidemenu_top}>
                      <div className={styles.sidemenu_close} onClick={() => setShowSide(false)}>
                        <MdClose color="#878A8C" lassName={styles.sidemenu_close_icon} />
                      </div>
                    </div>
                    <div className={styles.sidemenu_content} role="menu">
                      <SideMenu location={name} />
                    </div>
                  </div>
                )}
                <div>
                  <div className={styles.wrapper4}>
                    <div className={styles.wrapper_background} />
                    <div className={styles.content_wrapper}>
                      <div className={styles.content}>{children}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.mobile_wrapper3}>{children}</div>
            </div>
          )}

          {device === 'mobile' && stateString && stateString !== 'Succeeded' && (
            <div className={`loading-ellipsis ${styles.stateString}`}>{stateString}</div>
          )}
        </div>
      </div>

      {showCreateSubModal ? <CreateSubPlebbit /> : ''}
      {showImportAccountModal ? <ImportAccount /> : ''}
    </>
  );
};
export default Layout;
