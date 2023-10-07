import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.css';

const TabButton = ({ tab, page, subPlebbit }) => {
  return (
    <Link
      className={styles.content_tab}
      aria-selected={tab?.id === page}
      to={`/p/${subPlebbit?.address}/about/${tab?.id}/`}
    >
      {tab?.name}
    </Link>
  );
};

export default TabButton;
