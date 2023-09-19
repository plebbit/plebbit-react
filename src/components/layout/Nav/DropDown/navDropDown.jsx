import React, { useState } from 'react';
import Avatar from '../../../Avatar';
import { GiBlackHoleBolas, GiTwoCoins } from 'react-icons/gi';
import { FiChevronDown } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import Switch from '../../../Button/Switch';
import { Link } from 'react-router-dom';
import { BsEye } from 'react-icons/bs';
import { RiCreativeCommonsByLine } from 'react-icons/ri';
import { BiHelpCircle } from 'react-icons/bi';
import numFormatter from '../../../../utils/numberFormater';
import styles from './dropdown.module.css';
import useVisible from '../../../../hooks/useVisible';
import NavUserDropdown from './navUserDropdown';
import useStore from '../../../../store/useStore';

const NavDropDown = ({
  authorAvatarImageUrl,
  profile,
  showDropDown,
  setShowDropDown,
  colorMode,
  toggleTheme,
}) => {
  const { ref } = useVisible(setShowDropDown);
  const { setShowCreateSubModal } = useStore((state) => state);
  return (
    <div ref={ref}>
      <button
        className={styles.nav_rrr_dropdown}
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <span className={styles.nav_rrr_dropdown2}>
          <span className={styles.nav_rrr_dropdown3}>
            <div className={styles.nav_rrr_dropdown_avatar_cont}>
              <div className={styles.nav_rrr_dropdown_avatar_cont2}>
                <div className={styles.nav_rrr_dropdown_avatar_cont3}>
                  <Avatar avatar={authorAvatarImageUrl} width={24} height={24} />
                </div>
              </div>
            </div>
            <span className={styles.nav_rrr_dropdown_text_cont}>
              <span className={styles.nav_rrr_dropdown_text_username}>
                {profile?.author?.displayName || profile?.name}
              </span>
              <span className={styles.nav_rrr_dropdown_text_karma}>
                <GiBlackHoleBolas className={styles.nav_rrr_dropdown_text_icon} />
                <span> {`${numFormatter(profile?.karma?.score || 0)} karma`}</span>
              </span>
            </span>
          </span>
          <FiChevronDown className={styles.nav_rrr_dropdown_icon} />
        </span>
      </button>
      <div>
        {showDropDown && (
          <div className={styles.nav_rr_menu} role="menu" tabIndex="-1">
            <div>
              <NavUserDropdown authorAvatarImageUrl={authorAvatarImageUrl} profile={profile} />
              <div className={styles.nav_rr_menu_head}>
                <span className={styles.nav_rr_menu_head2}>
                  <span className={styles.nav_rr_menu_head_avatar}>
                    <CgProfile className={styles.nav_rr_menu_head_avatar_icon} />
                  </span>
                  <span className={styles.nav_rr_menu_head_avatar_text}>My stuff</span>
                </span>
              </div>
              <div className={styles.nav_rr_menu_items_container}>
                <button className={styles.nav_rr_menu_item1}>
                  <span>Online Status</span>
                  <Switch />
                </button>
                <Link to="/profile/" className={styles.nav_rr_menu_item}>
                  <span>Profile</span>
                </Link>
                <Link to="/settings/" className={styles.nav_rr_menu_item}>
                  <span>Settings</span>
                </Link>
              </div>
            </div>
            <div>
              <div className={styles.nav_rr_menu_head}>
                <span className={styles.nav_rr_menu_head2}>
                  <span className={styles.nav_rr_menu_head_avatar}>
                    <BsEye className={styles.nav_rr_menu_head_avatar_icon} />
                  </span>
                  <span className={styles.nav_rr_menu_head_avatar_text}>View Options</span>
                </span>
              </div>
              <div className={styles.nav_rr_menu_items_container}>
                <button className={styles.nav_rr_menu_item1}>
                  <span>Mod Mode</span>
                  <Switch />
                </button>
                <button className={styles.nav_rr_menu_item1}>
                  <span>Dark Mode</span>
                  <Switch checked={String(colorMode === 'dark')} onChange={toggleTheme} />
                </button>
              </div>
            </div>
            <div onClick={() => setShowCreateSubModal(true)} className={styles.nav_rr_menu_item3}>
              <span className={styles.nav_rr_menu_item3_1}>
                <span className={styles.nav_rr_menu_item3_icon_wrap}>
                  <RiCreativeCommonsByLine className={styles.nav_rr_menu_item3_icon} />
                </span>
                <span className={styles.nav_rr_menu_item3_text}>Create a Subplebbit</span>
              </span>
            </div>
            <button className={styles.nav_rr_menu_item3}>
              <span className={styles.nav_rr_menu_item3_1}>
                <span className={styles.nav_rr_menu_item3_icon_wrap}>
                  <GiTwoCoins className={styles.nav_rr_menu_item3_icon} />
                </span>
                <span className={styles.nav_rr_menu_item3_text}>0 Coin</span>
              </span>
            </button>
            <button className={styles.nav_rr_menu_item3}>
              <span className={styles.nav_rr_menu_item3_1}>
                <span className={styles.nav_rr_menu_item3_icon_wrap}>
                  <BiHelpCircle className={styles.nav_rr_menu_item3_icon} />
                </span>
                <span className={styles.nav_rr_menu_item3_text}>Help Center</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavDropDown;
