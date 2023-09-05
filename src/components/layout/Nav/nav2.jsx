import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useColorMode, useColorModeValue, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAccount,
  useAccountSubplebbits,
  useAccounts,
  useAuthorAvatar,
} from '@plebbit/plebbit-react-hooks';
import useStore from '../../../store/useStore';
import Sort from '../../../utils/sort';
import convertArrToObj from '../../../utils/convertArrToObj';
import getIsOnline from '../../../utils/getIsOnline';
import { ReactComponent as PlebLogo } from '../../svgs/logo.svg';
import { ReactComponent as PlebLogotext } from '../../svgs/plebbitText.svg';
import { BsArrowUpRightCircle, BsEye, BsPlusLg, BsShield } from 'react-icons/bs';
import getUserName, { getSubName } from '../../../utils/getUserName';
import Avatar from '../../Avatar';
import NavSearch from './navSearch';
import NavNotification from './NavNotification';
import { AiOutlinePlus } from 'react-icons/ai';
import numFormatter from '../../../utils/numberFormater';
import { FiChevronDown } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import Switch from '../../Button/Switch';
import HomeDropdown from './DropDown/homeDropdown';
import NavDropDown from './DropDown/navDropDown';

const NavBar2 = ({ location, showStyleBar }) => {
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
  const navBorder = useColorModeValue('#edeff1', '#343536');
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
  const { accounts: accountLists } = useAccounts();
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const {
    device,
    version,
    setPostView,
    postView,
    homeAdd,
    subPlebbitData: gitData,
    subPlebbitDefData,
    showSide,
    setShowSide,
  } = useStore((state) => state);

  const userTheme = profile?.plebbitReactOptions?.darkMode;

  const toggleTheme = () => {
    toggleColorMode();
    setAccount({
      ...profile,
      plebbitReactOptions: {
        darkMode: !Boolean(userTheme),
      },
    });
  };

  const [showMenu, setShowMenu] = useState(false);

  const subPlebbitData = Sort(
    convertArrToObj(
      [gitData, subPlebbitDefData?.filter((x) => x !== undefined)]?.flat(),
      'address',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  const toast = useToast();

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.nav_wrapper}>
          {/* nev left */}
          <div className={styles.nav_left}>
            {/* logo */}
            <Link aria-label="Home" className={styles.logo_cont} to="/">
              <PlebLogo className={styles.logo} />
              <PlebLogotext className={styles.logo_text} />
            </Link>
            {/* Home drop down menu */}
            <HomeDropdown
              showMenu={showMenu}
              setShowMenu={setShowMenu}
              showSide={showSide}
              setShowSide={setShowSide}
              accountSubplebbits={accountSubplebbits}
              subPlebbitData={subPlebbitData}
              authorAvatarImageUrl={authorAvatarImageUrl}
              profile={profile}
              location={location}
              homeAdd={homeAdd}
            />
            <NavSearch />
          </div>
          <div className={styles.nav_right}>
            <div className={styles.nav_popular_wrap}>
              <div className={styles.nav_popular_wrap2}>
                <Link className={styles.nav_popular}>
                  <BsArrowUpRightCircle className={styles.nav_popular_icon} />
                </Link>
              </div>
            </div>
            <div className={styles.nav_right_right}>
              <div className={styles.nav_right_right2}>
                <div className={styles.nav_rr_left}>
                  <span className={styles.nav_rr_left_item}>
                    <button className={styles.nav_rr_left_item_btn}>
                      <div className={styles.nav_rr_left_item_btn2}>
                        <span className={styles.nav_rr_left_item_btn_dot} />
                        <BsShield className={styles.nav_rr_left_item_icon} />
                      </div>
                    </button>
                  </span>
                  <NavNotification />
                  <span className={styles.nav_rr_left_item}>
                    <Link className={styles.nav_rr_left_item_btn} to="/submit">
                      <div className={styles.nav_rr_left_item_btn2}>
                        <AiOutlinePlus className={styles.nav_rr_left_item_icon} />
                      </div>
                    </Link>
                  </span>
                  <span className={styles.nav_rr_left_item} />
                </div>
                <NavDropDown authorAvatarImageUrl={authorAvatarImageUrl} profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar2;
