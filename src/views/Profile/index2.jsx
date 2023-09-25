import {
  useAccount,
  useAccountComments,
  useAuthorAvatar,
  useComments,
} from '@plebbit/plebbit-react-hooks';
import React, { useMemo } from 'react';
import useStore from '../../store/useStore';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/layout';
import styles from './profile.module.css';
import getUserName from '../../utils/getUserName';

// don't put inside component or will cause rerenders
const isReply = (comment) => !!comment.parentCid;

const Profile = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device } = useStore((state) => state);
  const location = useLocation();
  const currentView = location.pathname.split('/')[2];
  const { accountComments: myPost } = useAccountComments({
    filter: currentView === 'comments' ? isReply : undefined,
  });
  const blockedCids = useMemo(
    () => Object.keys(profile?.blockedCids || {}) || [],
    [profile?.blockedCids]
  );
  const { comments: blockedFeeds } = useComments({
    commentCids: blockedCids,
  });
  const navOptions = [
    { label: 'overview', link: 'overview', optional: '' },
    { label: 'posts', link: 'posts' },
    { label: 'comments', link: 'comments' },
    { label: 'history', link: 'history' },
    { label: 'saved', link: 'saved' },
    { label: 'hidden', link: 'hidden' },
    { label: 'upvoted', link: 'upvoted' },
    { label: 'downvoted', link: 'downvoted' },
    { label: 'awards received', link: 'gilded' },
    { label: 'awards given', link: 'gilded/given' },
  ];
  const feeds = myPost ? [...myPost].reverse() : [];
  const fullNav = !(currentView === 'overview' || currentView === '');

  console.log({ currentView });
  return (
    <Layout name={{ label: getUserName(profile?.author) || 'Profile', value: location?.pathname }}>
      <>
        <div className={styles.profile_header}>
          <div>
            <div className={styles.profile_header2}>
              <div className={styles.profile_header3}>
                {navOptions?.map((option, index) => (
                  <Link
                    key={index}
                    className={styles.profile_header_link}
                    to={`/profile/${option?.link}/`}
                    as={Link}
                    active={String(
                      currentView === option?.link || currentView === option?.optional
                    )}
                  >
                    {option?.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Profile;
