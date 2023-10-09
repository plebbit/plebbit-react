import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './about.module.css';

const TabButton = ({ tab }) => {
  const { subplebbitAddress, page } = useParams();

  return (
    <Link
      className={styles.content_tab}
      aria-selected={tab?.id === page}
      to={!tab?.disabled && `/p/${subplebbitAddress}/about/${tab?.id}/`}
      disabled={tab?.disabled}
    >
      {tab?.name}
    </Link>
  );
};

export default TabButton;
