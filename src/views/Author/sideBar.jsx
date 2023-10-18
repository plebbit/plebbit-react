import React, { useState } from 'react';
import { AiOutlineCamera, AiOutlineSetting } from 'react-icons/ai';
import { GiMoebiusStar } from 'react-icons/gi';
import { Button2 } from '../../components/Button';
import numFormatter from '../../utils/numberFormater';
import AddAvatar from '../Settings/modal/addAvatar';
import Image from '../../components/Image';
import { SideBarWrap } from '../../components/container/FeedContent';
import styles from './profile.module.css';
import { Link, useParams } from 'react-router-dom';
import {
  useAccount,
  useAccountSubplebbits,
  useAuthor,
  useAuthorAvatar,
} from '@plebbit/plebbit-react-hooks';
import getUserName, { getSubName } from '../../utils/getUserName';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import Avatar from '../../components/Avatar';

const SideBar = () => {
  const { authorAddress, commentCid } = useParams();
  const profile = useAuthor({ commentCid, authorAddress });
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const [isOpen, setIsOpen] = useState(false);

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
          </div>
        </div>
      </div>

      <BacktoTopButton />

      {isOpen ? <AddAvatar isOpen={isOpen} setIsOpen={setIsOpen} /> : ''}
    </SideBarWrap>
  );
};
export default SideBar;
