import React from 'react';
import styles from './dot.module.css';

const Dot = ({ className }) => {
  return <span className={[styles.mobile_dot, className].join(' ')}> • </span>;
};

export default Dot;
