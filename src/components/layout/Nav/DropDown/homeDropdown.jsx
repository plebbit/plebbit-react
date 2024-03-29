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
import { useAccount, useAccountSubplebbits, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';

const HomeDropdown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { ref } = useVisible(setShowMenu);

  const { showSide, setShowSide, appTitle: location } = useStore((state) => state);

  return (
    <div className={styles.nav_home_dropdown} ref={ref}>
      <button className={styles.nav_home_dropdown_btn} onClick={() => setShowMenu(!showMenu)}>
        <span className={styles.nav_home_dropdown_text_wrap}>
          <h1>{location?.label || location?.title}</h1>
        </span>

        {location?.icon ? (
          <location.icon className={styles.nav_home_dropdown_icon} />
        ) : (
          <MdHome className={styles.nav_home_dropdown_icon} />
        )}
        <BiChevronDown className={styles.nav_home_dropdown_caret} />
      </button>
      {!showSide && showMenu && (
        <RiSideBarFill
          className={styles.nav_home_dropdown_sidemenu}
          onClick={() => setShowSide(true)}
        />
      )}

      {showMenu && (
        <div role="menu" className={styles.nav_home_dropdown_menu_wrap}>
          <SideMenu location={location} />
        </div>
      )}
    </div>
  );
};

export default HomeDropdown;

export const SideMenu = ({ location }) => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const {
    subPlebbitData: gitData,
    subPlebbitDefData,
    setShowCreateSubModal,
  } = useStore((state) => state);

  const subPlebbitData = Sort(
    convertArrToObj(
      [gitData, subPlebbitDefData?.filter((x) => x !== undefined)]?.flat(),
      'address',
      true
    ),
    (x) => getIsOnline(x?.updatedAt),
    true
  );

  return (
    <>
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
                style={{
                  marginRight: '8px',
                }}
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
      <button className={styles.nav_home_create_sub} onClick={() => setShowCreateSubModal(true)}>
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
          <Link key={index} to={`/p/${pages?.value}/`} className={styles.nav_home_moderating_item}>
            <Avatar
              width={20}
              height={20}
              style={{
                marginRight: '8px',
              }}
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
        <Avatar
          width={20}
          height={20}
          style={{
            marginRight: '8px',
          }}
          avatar={authorAvatarImageUrl}
        />
        <span className={styles.nav_home_moderating_item_text}>{getUserName(profile?.author)}</span>
      </Link>
      <Link className={styles.nav_home_moderating_item} to="/submit">
        <BsPlusLg className={styles.nav_home_moderating_item_icon} />
        <span className={styles.nav_home_moderating_item_text}>Create Post</span>
      </Link>
      <Link className={styles.nav_home_moderating_item} to="/notifications">
        <BiBell className={styles.nav_home_moderating_item_icon} />
        <span className={styles.nav_home_moderating_item_text}>Notifications</span>
      </Link>
    </>
  );
};
