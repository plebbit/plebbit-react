import React from 'react';
import NavBar from './Nav';
import { MdClose } from 'react-icons/md';
import { Outlet, useLocation } from 'react-router-dom';
import { useAccount, useNotifications } from '@plebbit/plebbit-react-hooks';
import useStore from '../../store/useStore';
import styles from './layout.module.css';
import { SideMenu } from './Nav/DropDown/homeDropdown';
import CreateSubPlebbit from './Nav/modal/CreateSubPlebbit';
import ImportAccount from './Nav/modal/importAccount';
import SubStyleSide from '../../views/SubPlebbit/subStyleSide';
import ProfileDataProvider from '../../store/profileContext';

const Layout = () => {
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });
  const {
    device,
    showSide,
    setShowSide,
    showImportAccountModal,
    showCreateSubModal,
    appTitle,
    stateString,
  } = useStore((state) => state);
  const { search } = useLocation();
  const showStyleBar = search === '?styling=true';

  const unreadNotificationsCount =
    notifications?.notifications?.filter((x) => !x?.markedAsRead).length || 0;

  document.title = `${unreadNotificationsCount ? `(${unreadNotificationsCount}) ` : ''}${
    appTitle?.label
  }`;

  return (
    <>
      <ProfileDataProvider />
      <div className={styles.wrapper}>
        <div tabIndex="-1" />
        <div className={styles.wrapper2}>
          <NavBar showStyleBar={showStyleBar} />
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
                <div className={styles.sub_app_wrapper} showStyleBar={String(showStyleBar)}>
                  <div>
                    <div className={styles.wrapper4}>
                      <div className={styles.wrapper_background} />
                      <div className={styles.content_wrapper}>
                        <Outlet />
                      </div>
                    </div>
                  </div>
                  <div>{showStyleBar && <SubStyleSide />}</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.mobile_wrapper3}>
                <Outlet />
              </div>
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
