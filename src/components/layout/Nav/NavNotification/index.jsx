import { Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsCheckAll } from 'react-icons/bs';
import { VscBell } from 'react-icons/vsc';
import { MdSettings } from 'react-icons/md';
import Avatar from '../../../Avatar';
import DropDown from '../../../DropDown';
import PopOver from '../../../PopOver';
import { getTimeVal } from '../../../../utils/formatDate';
import getUserName from '../../../../utils/getUserName';
import { toast } from 'react-toastify';
import { useAccount, useNotifications } from '@plebbit/plebbit-react-hooks';
import styles from './navNotification.module.css';
import { Link } from 'react-router-dom';
import Button from '../../../Button';
import Dot from '../../../Dot';

const NavNotification = () => {
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });

  const handleReadAll = async () => {
    await notifications?.markAsRead();
    toast({
      title: 'Accepted.',
      description: 'All Notification read',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <PopOver
      title={
        <button className={styles.nav_bell_wrap}>
          <div className={styles.nav_bell}>
            <VscBell />
            {notifications?.notifications?.filter((x) => !x?.markedAsRead).length && (
              <span>{notifications?.notifications?.filter((x) => !x?.markedAsRead).length}</span>
            )}
          </div>
        </button>
      }
      header={
        <nav className={styles.notification_head}>
          <span className={styles.nh_title}>Notifications</span>
          <span className={styles.nh_right}>
            <button onClick={handleReadAll}>
              <BsCheckAll />
            </button>

            <Link to="/settings/notifications">
              <MdSettings />
            </Link>
          </span>
        </nav>
      }
      footer={
        <div className={styles.notification_footer}>
          <Link to="/notifications">
            <Button
              onClick={() => {
                handleReadAll();
              }}
            >
              SEE ALL
            </Button>
          </Link>
        </div>
      }
      content={
        <div className={styles.notif_container}>
          {notifications?.notifications?.map((notifications, index) => (
            <NotificationType
              handleReadAll={handleReadAll}
              key={index}
              notification={notifications}
            />
          ))}
        </div>
      }
    />
  );
};

export default NavNotification;

export const NotificationType = ({ notification, handleReadAll }) => {
  return (
    <>
      <Link
        className={styles.notif_item}
        to={`/p/${notification?.subplebbitAddress}/c/${notification?.cid}/`}
        onClick={() => {
          handleReadAll();
        }}
        style={{
          backgroundColor: !notification?.markedAsRead ? '#F6F7F8' : '#fff',
        }}
      >
        <span className={styles.ni_avatar}>
          <Avatar height={32} width={32} />
        </span>
        <div className={styles.ni_content}>
          <span>
            <span>
              {getUserName(notification?.author)} replied to your post in{' '}
              {`p/${notification?.subplebbitAddress}`}
              <Dot />
              <span
                style={{
                  lineHeight: '19px',
                }}
              >
                {getTimeVal(notification?.timestamp * 1000)}
              </span>
            </span>
          </span>
          <span className={styles.ni_content2}>{notification?.content}</span>
        </div>
      </Link>
    </>
  );
};
