import React, { useState } from 'react';
import { AiOutlineCamera, AiOutlineSetting } from 'react-icons/ai';
import { GiMoebiusStar } from 'react-icons/gi';
import { Button2 } from '../../components/Button';
import numFormatter from '../../utils/numberFormater';
import AddAvatar from '../Settings/modal/addAvatar';
import Image from '../../components/Image';
import { SideBarWrap } from '../../components/container/FeedContent';
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
import { useAccount, useAccountSubplebbits, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import getUserName, { getSubName } from '../../utils/getUserName';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import Avatar from '../../components/Avatar';

const SideBar = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const [isOpen, setIsOpen] = useState(false);
  const { accountSubplebbits } = useAccountSubplebbits();

  return (
    <SideBarWrap>
      <div className={styles.profile_sidebar}>
        <div className={styles.ps_top}>
          <div className={styles.ps_top2}>
            <div className={styles.pst_banner}>
              <div className={styles.pst_banner2}>
                <label>
                  <div className={styles.add_avatar} onClick={() => setIsOpen(true)}>
                    <AiOutlineCamera />
                  </div>
                </label>
              </div>
            </div>
            <Link to="/settings/profile/" className={styles.pst_settings}>
              <AiOutlineSetting />
            </Link>
            <div className={styles.pst_avatar}>
              <Image src={authorAvatarImageUrl} className={styles.pst_avatar2} />
            </div>
            <h1>{profile?.author?.displayName || profile?.name}</h1>
            <span>{getUserName(profile?.author)}</span>
            <div className={styles.pst_info}>
              <div className={styles.pst_info_item}>
                <h5>karma</h5>
                <div className={styles.pst_info_item_bot}>
                  <GiMoebiusStar />
                  <span> {numFormatter(profile?.karma?.score) || 0}</span>
                </div>
              </div>
              {/* <div className={styles.pst_info_item}>
                <h5>Cake day</h5>
                <div className={styles.pst_info_item_bot}>
                  <GiCakeSlice />
                  <span> {numFormatter(profile?.karma?.score) || 0}</span>
                </div>
              </div> */}
            </div>
            <Link to="/submit" className={styles.pst_new_post}>
              <Button2
                style={{
                  color: '#fff',
                  backgroundColor: '#0079d3',
                  width: '100%',
                }}
              >
                New post
              </Button2>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.profile_mod_sidebar}>
        <div className={styles.pms_top}>
          <div className={styles.pms_top2}>
            <h2>You're a moderator of these subplebbits</h2>
          </div>
        </div>
        <div className={styles.pms_bottom}>
          {accountSubplebbits &&
            Object?.values(accountSubplebbits)?.map((item, index) => (
              <div key={index} className={styles.pms_bottom_item}>
                <div className={styles.pms_bottom_item2}>
                  <Avatar width={32} height={32} mr="8px" avatar={item?.suggested?.avatarUrl} />
                  <div className={styles.pms_bottom_item_sub}>
                    <div className={styles.pms_bottom_item_sub2}>
                      <Link to={`/p/${item?.address}`}>{getSubName(item)}</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <BacktoTopButton />

      {isOpen ? <AddAvatar isOpen={isOpen} setIsOpen={setIsOpen} /> : ''}
    </SideBarWrap>
  );
};
export default SideBar;
