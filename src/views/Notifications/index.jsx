import moment from 'moment';
import React from 'react';
import { BsCheckAll } from 'react-icons/bs';
import { FaBell } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';
import { toast } from 'react-toastify';
import Layout from '../../components/layout';
import { NotificationType } from '../../components/layout/Nav/NavNotification';
import { useAccount, useNotifications } from '@plebbit/plebbit-react-hooks';
import { Link } from 'react-router-dom';
import styles from './notifications.module.css';
import useAppTitle from '../../hooks/useAppTitle';

const Notifications = () => {
  const profile = useAccount();
  const notifications = useNotifications({ accountName: profile?.name });
  const todayNotifications = notifications?.notifications?.filter((x) =>
    moment(x?.timestamp * 1000).isSame(new Date())
  );
  const earlierNotifications = notifications?.notifications?.filter(
    (x) => !moment(x?.timestamp * 1000).isSame(new Date())
  );
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

  useAppTitle({ label: 'Notifications', value: 'notification', icon: <FaBell /> });

  return (
    <Layout name={{ label: 'Notifications', value: 'notification', icon: <FaBell /> }}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_top}>
          <h2>Notifications</h2>
          <div className={styles.wrapper_top_header}>
            <div className={styles.wth_act}>Activity</div>
            <div
              className={styles.wth_act}
              style={{
                marginLeft: 'auto',
                borderBottom: '0',
                color: '#7c7c7c',
              }}
              onClick={handleReadAll}
            >
              <BsCheckAll />
              Mark as Read
            </div>
            <Link
              className={styles.wth_act}
              style={{
                marginLeft: 'auto',
                borderBottom: '0',
                color: '#7c7c7c',
              }}
              to="/settings/notifications"
            >
              <MdSettings />
              Settings
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content2}>
            <div className={styles.content22}>
              {todayNotifications?.length ? (
                <>
                  <div className={styles.content_head}>Today</div>
                  {todayNotifications?.map((notification) => (
                    <>
                      <div className={styles.content3}>
                        {/* unread reply notification item */}
                        <div className={styles.content3_item}>
                          <NotificationType notification={notification} />
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                ''
              )}
              {earlierNotifications?.length ? (
                <>
                  <div className={styles.content_head}>Earlier</div>
                  {earlierNotifications?.map((notification) => (
                    <>
                      <div className={styles.content3}>
                        {/* unread reply notification item */}
                        <div className={styles.content3_item}>
                          <NotificationType notification={notification} />
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
