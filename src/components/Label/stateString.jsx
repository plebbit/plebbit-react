import React from 'react';
import styles from './label.module.css';

const StateString = ({ stateString, textSx }) => {
  return (
    <>
      {stateString && stateString !== 'Succeeded' && (
        <>
          <span className={styles.style_dot}>•</span>
          <span style={textSx} className={[styles.style_string, 'loading-ellipsis'].join(' ')}>
            {stateString}
          </span>
        </>
      )}
    </>
  );
};

export default StateString;
