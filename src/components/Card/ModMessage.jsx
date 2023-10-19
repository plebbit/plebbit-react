import React from 'react';
import { BiShieldX } from 'react-icons/bi';
import { FaLock } from 'react-icons/fa';
import { getSubName } from '../../utils/getUserName';
import styles from './card.module.css';

export const RemovedMessage = ({ subplebbit }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ribbon} />
      <div className={styles.wrap_icon}>
        <BiShieldX color="#ff585b" />
      </div>
      <div className={styles.content}>
        <div className={styles.content1}>
          Sorry, this post has been removed by the moderators of {getSubName(subplebbit)}.
        </div>
        <div className={styles.content2}>
          Moderators remove posts from feeds for a variety of reasons, including keeping communities
          safe, civil, and true to their purpose.
        </div>
      </div>
    </div>
  );
};

export const DeletedMessage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.ribbon} />
      <div className={styles.wrap_icon}>
        <BiShieldX color="#ff585b" />
      </div>
      <div className={styles.content}>
        <div className={styles.content1}>
          Sorry, this post was deleted by the person who originally posted it.
        </div>
        <div className={styles.content2}>
          Sorry, this post was deleted by the person who originally posted it. It doesn't appear in
          any feeds, and anyone with a direct link to it will see a message like this one.
        </div>
      </div>
    </div>
  );
};
export const LockedMessage = ({ subplebbit }) => {
  return (
    <div className={styles.wrapper} style={{ borderColor: '#ffd635' }}>
      <div className={styles.ribbon} style={{ background: '#ffd635' }} />
      <div className={styles.wrap_icon}>
        <FaLock color="#ffd635" />
      </div>
      <div className={styles.content}>
        <div className={styles.content1}>
          This thread has been locked by the moderators of {getSubName(subplebbit)}.
        </div>
        <div className={styles.content2}>New comments cannot be posted</div>
      </div>
    </div>
  );
};
