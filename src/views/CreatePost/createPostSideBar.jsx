import React from 'react';
import BottomSideBar from '../../components/sidebar/bottomSideBar';

import { SideBarWrap } from '../../components/container/FeedContent';
import { AboutSubSideBar, SubRulesSideBar } from '../SubPlebbit/sideBar';
import styles from './createpost.module.css';
import Avatar from '../../components/Avatar';

const CreatePostSideBar = ({ subPlebbit }) => {
  return (
    <SideBarWrap className={styles.side_wrap}>
      <div className={styles.side_wrap2}>
        {subPlebbit && <AboutSubSideBar subPlebbit={subPlebbit} hideBtn />}
        {subPlebbit?.rules && <SubRulesSideBar subPlebbit={subPlebbit} />}
        <div className={styles.side_rules}>
          <div className={styles.sr_top}>
            <Avatar
              height={40}
              width={40}
              style={{
                marginRight: '8px',
                paddingBottom: '5px',
              }}
            />
            Posting to Plebbit
          </div>
          <ol>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
            <li>Post anything you like</li>
          </ol>
        </div>
        <BottomSideBar />
      </div>
    </SideBarWrap>
  );
};

export default CreatePostSideBar;
