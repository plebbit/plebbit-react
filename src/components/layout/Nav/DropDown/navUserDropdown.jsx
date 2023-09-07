import React, { useState } from 'react';
import styles from './dropdown.module.css';
import Avatar from '../../../Avatar';
import { FiChevronDown } from 'react-icons/fi';
import { createAccount, setActiveAccount, useAccounts } from '@plebbit/plebbit-react-hooks';
import ImportAccount from '../modal/importAccount';
import { useDisclosure, useToast } from '@chakra-ui/react';

const NavUserDropdown = ({ profile, authorAvatarImageUrl, onOpen }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { accounts: accountLists } = useAccounts();
  const toast = useToast();

  const handleCreateAccount = async () => {
    await createAccount();
    toast({
      title: 'Create Account.',
      description: 'Account Created Successfully',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <div className={styles.nav_user_dd}>
      <button
        className={styles.nav_user_dd_btn}
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
      >
        <span className={styles.nav_rrr_dropdown2}>
          <span className={styles.nav_rrr_dropdown3}>
            <div className={styles.nav_rrr_dropdown_avatar_cont}>
              <div className={styles.nav_user_dd_dropdown_avatar_cont2}>
                <div className={styles.nav_rrr_dropdown_avatar_cont3}>
                  <Avatar avatar={authorAvatarImageUrl} width={22} height={22} />
                </div>
              </div>
            </div>
            <span className={styles.nav_rrr_dropdown_text_cont}>
              <span className={styles.nav_user_dd_btn_text}>
                {profile?.author?.displayName || profile?.name}
              </span>
            </span>
          </span>
          <FiChevronDown className={styles.nav_rrr_dropdown_icon} />
        </span>
      </button>
      {showDropDown && (
        <div role="menu" tabIndex="-1" className={styles.nav_user_dd_menu}>
          <div className={styles.nav_user_dd_menu_item} onClick={handleCreateAccount}>
            Create Account
          </div>
          <div className={styles.nav_user_dd_menu_item} onClick={onOpen}>
            Import Account
          </div>
          {accountLists?.map((item, index) => (
            <div
              className={`${
                profile?.id === item?.id
                  ? styles.nav_user_dd_menu_accounts
                  : styles.nav_user_dd_menu_item
              }`}
              key={index}
              onClick={async () => {
                await setActiveAccount(item?.name);
                toast({
                  title: 'Account Changed.',
                  description: `${item?.name} selected`,
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });
              }}
            >
              {item?.author?.displayName ? item?.author?.displayName : item?.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavUserDropdown;
