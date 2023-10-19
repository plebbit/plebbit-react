import React from 'react';
import styles from './about.module.css';

const Container = ({ children, className, ...rest }) => {
  return (
    <div {...rest} className={[styles.about_wrapper, className].join(' ')}>
      {children}
    </div>
  );
};

export default Container;
