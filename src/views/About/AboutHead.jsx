import React from 'react';
import styles from './about.module.css';
import TabButton from './TabButton';
import { useParams } from 'react-router-dom';

const AboutHead = ({ title, options }) => {
  return (
    <>
      <div className={styles.content_title}>{title}</div>
      <div className={styles.content_page_tabs}>
        {options?.map((tab, index) => (
          <TabButton tab={tab} key={index} />
        ))}
      </div>
    </>
  );
};

export default AboutHead;
