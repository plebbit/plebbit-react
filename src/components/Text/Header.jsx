import React from 'react';
import styles from './text.module.css';

const Header = ({ title, className }) => {
  return (
    <div className={[styles.header_head, className].join(' ')}>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;

export const SubHeader = ({ title, className, ...rest }) => {
  return (
    <h3 {...rest} className={[styles.header_title, className].join(' ')}>
      {title}
    </h3>
  );
};
