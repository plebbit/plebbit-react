import React from 'react';
import BacktoTopButton from '../../components/sidebar/backtoTopButton';
import { useSubplebbit } from '@plebbit/plebbit-react-hooks';
import { useParams } from 'react-router-dom';
import { SideBarWrap } from '../../components/container/FeedContent';
import { AboutSubSideBar, SubModeratorSideBar, SubRulesSideBar } from '../SubPlebbit/sideBar';

const PostDetailSideBar = ({ subplebbit: subs }) => {
  const { subplebbitAddress } = useParams();
  const sub = useSubplebbit({ subplebbitAddress });
  const subPlebbit = sub || subs;

  return (
    <SideBarWrap>
      <AboutSubSideBar subPlebbit={subPlebbit} />
      {subPlebbit?.rules && <SubRulesSideBar subPlebbit={subPlebbit} />}

      <SubModeratorSideBar subPlebbit={subPlebbit} />
      <BacktoTopButton />
    </SideBarWrap>
  );
};

export default PostDetailSideBar;
