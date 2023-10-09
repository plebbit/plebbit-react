import React from 'react';
import styles from '../moderation.module.css';
import { SubUserFlairTabs } from '../../../../store/data';
import AboutHead from '../../AboutHead';
import { Button2 } from '../../../../components/Button';
import { MdWarning } from 'react-icons/md';

const UserFlair = () => {
  return (
    <>
      <AboutHead title="User Flair" options={SubUserFlairTabs} />
      <div className={styles.content_top2}>
        <Button2 role="button">Settings</Button2>
        <Button2
          role="button"
          style={{
            color: '#878a8c',
          }}
          disabled
        >
          Reorder
        </Button2>
        <Button2
          role="button"
          style={{
            backgroundColor: '#0079d3',
            color: '#fff',
            fill: '#fff',
          }}
        >
          Add
        </Button2>
      </div>
      <div className={styles.user_flair_disabled}>
        <div className={styles.user_flair_indicator} />
        <div className={styles.user_flair_indicator_icon}>
          <MdWarning />
        </div>
        <div className={styles.user_flair_content}>
          <div className={styles.ufc_title}>User flair is disabled</div>
          <div className={styles.ufc_message}>User flair is disabled</div>
        </div>
      </div>
      <table className={styles.userflair_table}>
        <thead className={styles.uft_header}>
          <th className={styles.uft_col}>Preview</th>
          <th className={styles.uft_col}>Settings</th>
          <th className={styles.uft_col}>flair Id</th>
          <td />
        </thead>

        <tbody className={styles.uft_content}></tbody>
      </table>
    </>
  );
};

export default UserFlair;
