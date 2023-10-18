import React from 'react';
import styles from './label.module.css';

const Label = (props) => {
  const { text, children, className } = props;
  return (
    <div {...props} className={[styles.container, className].join(' ')}>
      {text || children}
    </div>
  );
};

export default Label;
