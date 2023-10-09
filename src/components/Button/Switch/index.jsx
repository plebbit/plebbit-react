import React, { useState } from 'react';
import styles from './switch.module.css';

const Switch = ({ checked, onChange }) => {
  const [active, setActive] = useState(checked);
  return (
    <button
      className={styles.nav_rr_menu_item_switch}
      aria-checked={checked ? checked?.toString() : active?.toString()}
      type="button"
      role="switch"
      tabIndex={checked ? 0 : -1}
      onClick={() => (typeof onChange === 'function' ? onChange() : setActive(!active))}
    >
      <div className={styles.nav_rr_menu_item_switch_control} />
    </button>
  );
};

export default Switch;
