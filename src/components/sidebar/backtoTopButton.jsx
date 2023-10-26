import React from 'react';
import styles from './sidebar.module.css';
import { Button2 } from '../Button';

const BacktoTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className={styles.back_tt}>
      <Button2
        style={{
          backgroundColor: '#878a8c',
          color: '#fff',
          borderColor: '#878a8c',
        }}
        onClick={scrollToTop}
      >
        Back to Top
      </Button2>
    </div>
  );
};

export default BacktoTopButton;
