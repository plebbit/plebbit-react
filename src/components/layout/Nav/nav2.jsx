import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useColorMode, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAccount,
  useAccountSubplebbits,
  useAccounts,
  useAuthorAvatar,
} from '@plebbit/plebbit-react-hooks';
import useStore from '../../../store/useStore';
import useVisible from '../../../hooks/useVisible';
import Sort from '../../../utils/sort';
import convertArrToObj from '../../../utils/convertArrToObj';
import getIsOnline from '../../../utils/getIsOnline';
import { ReactComponent as PlebLogo } from '../../svgs/logo.svg';
import { ReactComponent as PlebLogotext } from '../../svgs/plebbitText.svg';
import { MdHome } from 'react-icons/md';
import { BiBell, BiChevronDown } from 'react-icons/bi';
import { RiFolderShield2Line, RiSideBarFill } from 'react-icons/ri';
import { GiShieldEchoes } from 'react-icons/gi';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { BsArrowUpRightCircle, BsPlusLg } from 'react-icons/bs';
import getUserName, { getSubName } from '../../../utils/getUserName';
import Avatar from '../../Avatar';

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

  const [showDropDown, setShowDropDown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { ref, showComponent, setShowComponent } = useVisible(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
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
    <header className={styles.wrapper}>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav_left}>
          <Link aria-label="Home" className={styles.logo_cont} to="/">
            <PlebLogo className={styles.logo} />
            <PlebLogotext className={styles.logo_text} />
          </Link>
          <div className={styles.nav_home_dropdown}>
            <button className={styles.nav_home_dropdown_btn} onClick={() => setShowMenu(!showMenu)}>
              <span className={styles.nav_home_dropdown_text_wrap}>
                <h1>Home</h1>
              </span>

              <MdHome className={styles.nav_home_dropdown_icon} />
              <BiChevronDown className={styles.nav_home_dropdown_caret} />
            </button>
            {!showSide && (
              <RiSideBarFill
                className={styles.nav_home_dropdown_sidemenu}
                onClick={() => setShowSide(true)}
              />
            )}

            {showMenu && (
              <div role="menu" className={styles.nav_home_dropdown_menu_wrap}>
                <input
                  aria-label="Start typing to filter your communities or use up and down to select."
                  placeholder="Filter"
                  className={styles.nav_home_filter_input}
                />
                <div className={styles.nav_home_moderating_title}>moderating</div>
                <Link className={styles.nav_home_moderating_item}>
                  <GiShieldEchoes className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Mod Queue</span>
                </Link>
                <Link className={styles.nav_home_moderating_item}>
                  <RiFolderShield2Line className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Modmail</span>
                </Link>
                <Link className={styles.nav_home_moderating_item}>
                  <GiShieldEchoes className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>p/Mod</span>
                </Link>
                {Object.keys(accountSubplebbits)?.length
                  ? Object.keys(accountSubplebbits)?.map((pages, index) => (
                      <Link
                        key={index}
                        to={`/p/${pages}/`}
                        className={styles.nav_home_moderating_item}
                      >
                        <Avatar
                          width={20}
                          height={20}
                          mr="8px"
                          avatar={accountSubplebbits[pages]?.avatar}
                          badge
                          isOnline={getIsOnline(accountSubplebbits[pages]?.updatedAt)}
                        />

                        <span className={styles.nav_home_moderating_item_text}>
                          {getSubName(accountSubplebbits[pages])}
                        </span>
                      </Link>
                    ))
                  : ''}
                <div className={styles.nav_home_moderating_title}>your communities</div>
                <button className={styles.nav_home_create_sub}>
                  <BsPlusLg className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Create Community</span>
                </button>
                {[
                  subPlebbitData?.map((x) => ({
                    ...x,
                    label: x?.title ? x?.title : getSubName(x),
                    value: x?.address,
                  })),
                ]
                  .flat()
                  ?.map((pages, index) => (
                    <Link
                      key={index}
                      to={`/p/${pages?.value}/`}
                      className={styles.nav_home_moderating_item}
                    >
                      <Avatar
                        width={20}
                        height={20}
                        mr="8px"
                        avatar={pages?.avatar}
                        badge
                        isOnline={getIsOnline(pages?.updatedAt)}
                      />
                      <span className={styles.nav_home_moderating_item_text}>
                        {getSubName(pages)}
                      </span>
                    </Link>
                  ))}
                <div className={styles.nav_home_moderating_title}>Feeds</div>
                <Link className={styles.nav_home_moderating_item} to="/">
                  <MdHome className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Home</span>
                </Link>
                <Link className={styles.nav_home_moderating_item}>
                  <BsArrowUpRightCircle className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Popular</span>
                </Link>
                <Link className={styles.nav_home_moderating_item} to="/all">
                  <HiOutlineChartSquareBar className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>All</span>
                </Link>
                <div className={styles.nav_home_moderating_title}>Other</div>
                <Link to={`/settings/`} className={styles.nav_home_moderating_item}>
                  <Avatar width={20} height={20} mr="8px" avatar={authorAvatarImageUrl} />
                  <span className={styles.nav_home_moderating_item_text}>
                    {getUserName(profile?.author)}
                  </span>
                </Link>

                <Link className={styles.nav_home_moderating_item} to="/submit">
                  <BsPlusLg className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Create Post</span>
                </Link>
                <Link className={styles.nav_home_moderating_item} to="/notifications">
                  <BiBell className={styles.nav_home_moderating_item_icon} />
                  <span className={styles.nav_home_moderating_item_text}>Notifications</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar2;
