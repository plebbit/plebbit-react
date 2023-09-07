import React, { useState } from 'react';
import { BiBell, BiChevronDown } from 'react-icons/bi';
import { GiShieldEchoes } from 'react-icons/gi';
import { MdHome } from 'react-icons/md';
import { RiFolderShield2Line, RiSideBarFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../../../Avatar';
import getIsOnline from '../../../../utils/getIsOnline';
import getUserName, { getSubName } from '../../../../utils/getUserName';
import { BsArrowUpRightCircle, BsPlusLg } from 'react-icons/bs';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import styles from './dropdown.module.css';
import useVisible from '../../../../hooks/useVisible';

import useStore from '../../../../store/useStore';
import Sort from '../../../../utils/sort';
import convertArrToObj from '../../../../utils/convertArrToObj';

const HomeDropdown = ({
  accountSubplebbits,
  authorAvatarImageUrl,
  profile,
  location,
  onOpenCreate,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { ref } = useVisible(setShowMenu);
  const {
    setPostView,
    postView,
    homeAdd,
    subPlebbitData: gitData,
    subPlebbitDefData,
    showSide,
    setShowSide,
  } = useStore((state) => state);

  const navigate = useNavigate();

  const subPlebbitData = Sort(
    convertArrToObj(
      [gitData, subPlebbitDefData?.filter((x) => x !== undefined)]?.flat(),
      'address',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  const getCurrentLocationVal = () =>
    location?.label !== 'Home'
      ? location
      : [
          { label: 'Home', value: homeAdd },
          {
            label: location?.label !== 'Home' ? 'Home' : 'p/All',
            value: subPlebbitData?.map((x) => x?.address)?.filter((x) => x !== undefined),
          },
        ].find((x) => x?.value?.sort().join('') === postView?.sort()?.join(''));

  return (
    <div className={styles.nav_home_dropdown} ref={ref}>
      <button className={styles.nav_home_dropdown_btn} onClick={() => setShowMenu(!showMenu)}>
        <span className={styles.nav_home_dropdown_text_wrap}>
          <h1>{location?.label || location?.title}</h1>
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
          {[
            location || {},
            {
              label: location?.label !== 'Home' ? 'Home' : 'p/All',
              value: subPlebbitData?.map((x) => x?.address)?.filter((x) => x !== undefined),
            },
          ]?.map((x, index) => (
            <button
              key={index}
              className={
                (Array.isArray(x?.value) &&
                  Array.isArray(getCurrentLocationVal()?.value) &&
                  x?.value?.sort()?.join('') ===
                    getCurrentLocationVal()?.value?.sort()?.join('')) ||
                x?.value === getCurrentLocationVal()?.value
                  ? styles.nav_home_moderating_selected_item
                  : styles.nav_home_moderating_item
              }
              onClick={() => {
                if (location.label === 'Home') {
                  setPostView(x.value);
                } else {
                  if (typeof x?.value === 'object') {
                    navigate('/');
                  } else {
                    navigate(x?.value);
                  }
                }
              }}
            >
              <span className={styles.nav_home_moderating_item_text2}>{x?.label}</span>
            </button>
          ))}

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
                <Link key={index} to={`/p/${pages}/`} className={styles.nav_home_moderating_item}>
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

          <button className={styles.nav_home_create_sub} onClick={onOpenCreate}>
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
                <span className={styles.nav_home_moderating_item_text}>{getSubName(pages)}</span>
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
  );
};

export default HomeDropdown;
