import React from 'react';
import styles from './about.module.css';
import TabButton from './TabButton';

const AboutHead = ({ title, options, active, subPlebbit }) => {
  return (
    <>
      <div className={styles.content_title}>{title}</div>
      <div className={styles.content_page_tabs}>
        {options?.map((tab, index) => (
          <TabButton tab={tab} key={index} subPlebbit={subPlebbit} page={active} />
        ))}
      </div>
    </>
  );
};

export default AboutHead;
