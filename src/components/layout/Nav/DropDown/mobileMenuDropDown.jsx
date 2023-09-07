import React, { useState } from 'react';
import styles from './dropdown.module.css';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const MobileMenuDropDown = ({ options, titleIcon, title, render }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <li className={`${styles.mobile_menu_item} ${showDropDown ? styles.mobile_menu_item2 : ''}`}>
      <button className={styles.mobile_menu_btn} onClick={() => setShowDropDown(!showDropDown)}>
        <span className={styles.mobile_menu_btn2}>
          <span className={styles.mobile_menu_item_icon_wrap}>
            <div className={styles.mobile_menu_item_icon_wrap2}>{titleIcon}</div>
          </span>
          <span className={styles.mobile_menu_item_text}>{title}</span>
          <span className={styles.mobile_menu_item_down}>
            {showDropDown ? (
              <BsChevronUp className={styles.mobile_menu_item_down_icon} />
            ) : (
              <BsChevronDown className={styles.mobile_menu_item_down_icon} />
            )}
          </span>
        </span>
      </button>
      {showDropDown && (
        <div className={styles.mobile_menu_dropdown}>
          <ul className={styles.mobile_menu_dropdown2}>
            {options?.map((option, index) => (
              <div key={index}>{render(option)}</div>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default MobileMenuDropDown;
