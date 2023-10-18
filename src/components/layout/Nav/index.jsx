import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useToast } from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  createAccount,
  setAccount,
  setActiveAccount,
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
import { ReactComponent as PlebLogotext2 } from '../../svgs/plebbitText2.svg';
import { BsArrowUpRightCircle, BsChevronDown, BsEye, BsPlusLg, BsShield } from 'react-icons/bs';
import getUserName, { getSubName } from '../../../utils/getUserName';
import Avatar from '../../Avatar';
import NavSearch from './navSearch';
import NavNotification from './NavNotification';
import {
  AiFillSetting,
  AiOutlineClose,
  AiOutlineFieldTime,
  AiOutlineInfoCircle,
  AiOutlinePlus,
} from 'react-icons/ai';

import { CgNotes } from 'react-icons/cg';
import HomeDropdown from './DropDown/homeDropdown';
import NavDropDown from './DropDown/navDropDown';
import { BiBookmarks, BiPencil } from 'react-icons/bi';
import { GiHamburgerMenu, GiTwoCoins } from 'react-icons/gi';
import { RiCreativeCommonsByLine, RiSearchLine } from 'react-icons/ri';
import { VscMail } from 'react-icons/vsc';
import MobileMenuDropDown from './DropDown/mobileMenuDropDown';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { bottomData1 } from '../../sidebar/projectLinks';
import plebbitReactPackageJson from '../../../../package.json';

const NavBar = ({ location }) => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const {
    device,
    homeAdd,
    subPlebbitData: gitData,
    subPlebbitDefData,
    setPostView,
    setShowImportAccountModal,
    setShowCreateSubModal,
    colorMode,
    toggleColorMode,
  } = useStore((state) => state);

  const { accounts: accountLists } = useAccounts();
  const userTheme = profile?.plebbitReactOptions?.darkMode;
  const { search } = useLocation();
  const showStyleBar = search === '?styling=true';
  const toggleTheme = () => {
    toggleColorMode();
    setAccount({
      ...profile,
      plebbitReactOptions: {
        darkMode: !Boolean(userTheme),
      },
    });
  };

  const [showDropDown, setShowDropDown] = useState(false);

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
    <>
      {device !== 'mobile' ? (
        <header className={styles.wrapper} showStyleBar={showStyleBar?.toString()}>
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
                  <NavDropDown
                    authorAvatarImageUrl={authorAvatarImageUrl}
                    profile={profile}
                    showDropDown={showDropDown}
                    setShowDropDown={setShowDropDown}
                    colorMode={colorMode}
                    toggleTheme={toggleTheme}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <>
          <nav className={styles.mobile_wrapper}>
            <ul className={styles.mobile_wrapper2}>
              <li className={styles.mobile_nav_left}>
                <Link to="/" className={styles.mobile_nav_logo_wrap}>
                  <PlebLogo className={styles.mobile_nav_logo} />
                </Link>
                <div className={styles.mobile_nav_logo_text_wrap}>
                  <Link to="/" className={styles.mobile_nav_logo_text_wrap2}>
                    <PlebLogotext2 className={styles.mobile_nav_logo_text} />
                  </Link>
                </div>
              </li>
              {showDropDown ? (
                <li>
                  <button
                    className={styles.mobile_nav_btn}
                    onClick={() => setShowDropDown(!showDropDown)}
                  >
                    <AiOutlineClose color="#fff" className={styles.mobile_menu} />
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/submit">
                      <button className={styles.mobile_nav_btn}>
                        <BiPencil color="#fff" className={styles.mobile_new_post} />
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      className={styles.mobile_nav_btn}
                      onClick={() => setShowDropDown(!showDropDown)}
                    >
                      <GiHamburgerMenu color="#fff" className={styles.mobile_menu} />
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
          {showDropDown && (
            <nav className={styles.mobile_menu_wrapper}>
              <ul className={styles.mobile_menu_wrapper2}>
                <div className={styles.mobile_menu_Search_wrapper}>
                  <label className={styles.mobile_menu_Search_wrapper2}>
                    <RiSearchLine color="#d7dadc" className={styles.mobile_menu_Search_icon} />
                    <div className={styles.mobile_menu_Search_wrap}>
                      <input
                        placeholder="Search Plebbit"
                        className={styles.mobile_menu_Search}
                        type="search"
                      />
                    </div>
                  </label>
                </div>
                <MobileMenuDropDown
                  title={getUserName(profile?.author)}
                  titleIcon={
                    <Avatar
                      width={24}
                      height={24}
                      style={{
                        marginRight: '8px',
                      }}
                      avatar={authorAvatarImageUrl}
                    />
                  }
                  options={[
                    { label: 'Create Account', create: true, legacy: true },
                    { label: 'Import Account', import: true, legacy: true },
                    accountLists,
                  ].flat()}
                  render={(pages) => (
                    <li
                      className={styles.mobile_menu_dropdown_item}
                      onClick={async () => {
                        if (pages?.create) {
                          handleCreateAccount();
                        }
                        if (pages?.import) {
                          setShowImportAccountModal(true);
                        } else {
                          await setActiveAccount(pages?.name);
                          toast({
                            title: 'Account Changed.',
                            description: `${pages?.name} selected`,
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                          });
                        }
                      }}
                    >
                      <Link
                        className={styles.mobile_menu_dropdown_item2}
                        active={!pages?.legacy && profile?.id === pages?.id && 'true'}
                      >
                        {pages?.legacy
                          ? pages?.label
                          : pages?.author?.displayName
                          ? pages?.author?.displayName
                          : pages?.name}
                      </Link>
                    </li>
                  )}
                />
                <li className={styles.mobile_menu_item}>
                  <Link to="/notifications" className={styles.mobile_menu_item1}>
                    <span className={styles.mobile_menu_item_icon_wrap}>
                      <div className={styles.mobile_menu_item_icon_wrap2}>
                        <VscMail className={styles.mobile_menu_item_icon} />
                      </div>
                    </span>
                    <span className={styles.mobile_menu_item_text}>Inbox</span>
                  </Link>
                </li>
                <li className={styles.mobile_menu_item}>
                  <Link className={styles.mobile_menu_item1}>
                    <span className={styles.mobile_menu_item_icon_wrap}>
                      <div className={styles.mobile_menu_item_icon_wrap2}>
                        <GiTwoCoins className={styles.mobile_menu_item_icon} />
                      </div>
                    </span>
                    <span className={styles.mobile_menu_item_text_wrap}>
                      <span className={styles.mobile_menu_item_text}>Coins</span>
                      <span className={styles.mobile_menu_item_text2}>0 coins</span>
                    </span>
                  </Link>
                </li>
                <MobileMenuDropDown
                  title="Recent Communities"
                  titleIcon={<AiOutlineFieldTime />}
                  options={[
                    { label: 'Home', value: homeAdd, legacy: true },
                    {
                      label: 'p/All',
                      value: subPlebbitData?.map((x) => x?.address)?.filter((x) => x !== undefined),
                      legacy: true,
                    },
                    [
                      subPlebbitData
                        .map((x) => ({
                          ...x,
                          label: x?.title || getSubName(x),
                          value: x?.address,
                        }))
                        ?.filter((x) => x !== undefined),
                    ].flat(),
                  ].flat()}
                  render={(pages) => (
                    <li
                      className={styles.mobile_menu_dropdown_item}
                      onClick={() => {
                        if (pages?.legacy) {
                          setShowDropDown(!showDropDown);
                          setPostView(pages?.value);
                        } else {
                          setShowDropDown(!showDropDown);
                        }
                      }}
                    >
                      <Link
                        to={!pages?.legacy ? `/p/${pages?.value}/` : '/'}
                        className={styles.mobile_menu_dropdown_item2}
                      >
                        {!pages?.legacy && (
                          <span className={styles.mobile_menu_dropdown_item_avatar_wrap}>
                            <Avatar
                              badge
                              avatar={pages?.avatar}
                              width={24}
                              height={24}
                              style={{
                                marginRight: '8px',
                              }}
                              isOnline={getIsOnline(pages?.updatedAt)}
                            />
                          </span>
                        )}
                        {pages?.label}
                      </Link>
                    </li>
                  )}
                />
                <MobileMenuDropDown
                  title="My Communities"
                  titleIcon={<HiOutlineUserGroup />}
                  options={[
                    { label: 'Create Community', legacy: true },
                    Object.keys(accountSubplebbits),
                  ].flat()}
                  render={(pages) => (
                    <li
                      className={styles.mobile_menu_dropdown_item}
                      onClick={() => {
                        if (pages?.legacy) {
                          setShowDropDown(!showDropDown);
                          setShowCreateSubModal(true);
                        } else {
                          setShowDropDown(!showDropDown);
                        }
                      }}
                    >
                      <Link
                        to={!pages?.legacy && `/p/${pages}/`}
                        className={styles.mobile_menu_dropdown_item2}
                      >
                        {!pages?.legacy ? (
                          <span className={styles.mobile_menu_dropdown_item_avatar_wrap}>
                            <Avatar
                              badge
                              avatar={accountSubplebbits[pages]?.avatar}
                              width={24}
                              height={24}
                              style={{
                                marginRight: '8px',
                              }}
                              isOnline={getIsOnline(accountSubplebbits[pages]?.updatedAt)}
                            />
                          </span>
                        ) : (
                          <RiCreativeCommonsByLine
                            className={styles.mobile_menu_dropdown_item_avatar_wrap}
                          />
                        )}
                        {pages?.legacy ? pages?.label : getSubName(accountSubplebbits[pages])}
                      </Link>
                    </li>
                  )}
                />
                <li className={styles.mobile_menu_item}>
                  <Link className={styles.mobile_menu_item1}>
                    <span className={styles.mobile_menu_item_icon_wrap}>
                      <div className={styles.mobile_menu_item_icon_wrap2}>
                        <BiBookmarks className={styles.mobile_menu_item_icon} />
                      </div>
                    </span>
                    <span className={styles.mobile_menu_item_text}>Saved</span>
                  </Link>
                </li>
                <MobileMenuDropDown
                  title="Settings"
                  titleIcon={<AiFillSetting />}
                  options={[
                    { label: 'Dark Mode', theme: true },
                    { label: 'Language', lang: true },
                    {
                      label: 'Account Settings',
                      value: 'settings',
                      link: true,
                    },
                  ]}
                  render={(pages) => (
                    <li
                      className={styles.mobile_menu_dropdown_item}
                      onClick={() => {
                        if (pages?.theme) {
                          toggleTheme();
                        } else {
                          setShowDropDown(!showDropDown);
                        }
                      }}
                    >
                      <Link
                        to={pages?.link && `/${pages?.value}/`}
                        className={styles.mobile_menu_dropdown_item2}
                        style={{
                          width: '100%',
                          display: 'flex',
                        }}
                      >
                        {pages?.label}
                        {pages?.theme && (
                          <div
                            onClick={() => toggleTheme()}
                            className={styles.mobile_menu_dropdown_item_aux}
                          >
                            <input type="checkbox" checked={colorMode === 'dark'} />
                          </div>
                        )}
                        {pages?.lang && (
                          <div className={styles.mobile_menu_dropdown_item_aux}>English (US)</div>
                        )}
                      </Link>
                    </li>
                  )}
                />
                <MobileMenuDropDown
                  title="More"
                  titleIcon={<AiOutlineInfoCircle />}
                  options={bottomData1}
                  render={(pages) => (
                    <li className={styles.mobile_menu_dropdown_item}>
                      <a
                        target="_blank"
                        href={pages?.link}
                        className={styles.mobile_menu_dropdown_item2}
                      >
                        {pages?.label}
                      </a>
                    </li>
                  )}
                />

                <li className={styles.mobile_menu_item}>
                  <Link className={styles.mobile_menu_item1}>
                    <span className={styles.mobile_menu_item_icon_wrap}>
                      <div className={styles.mobile_menu_item_icon_wrap2}>
                        <CgNotes className={styles.mobile_menu_item_icon} />
                      </div>
                    </span>
                    <span className={styles.mobile_menu_item_text}> Terms and Conditions</span>
                  </Link>
                </li>
                <li className={styles.mobile_menu_item}>
                  <Link className={styles.mobile_menu_item1}>
                    <span className={styles.mobile_menu_item_text}>
                      {' '}
                      Plebbit v{plebbitReactPackageJson.version}. GPL-2.0
                    </span>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default NavBar;
