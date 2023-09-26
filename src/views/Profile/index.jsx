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
import FeedContent from '../../components/container/FeedContent';
import FeedSort from '../../components/Post/FeedSort';
import SideBar from './sideBar';
import Post from '../../components/Post';
import Avatar from '../../components/Avatar';
import numFormatter from '../../utils/numberFormater';
import Dot from '../../components/Dot';
import { MdEdit } from 'react-icons/md';
import InfiniteScroll from '../../components/InfiniteScroll';

// don't put inside component or will cause rerenders
const isReply = (comment) => !!comment.parentCid;
const isPost = (comment) => !comment.parentCid;

const Profile = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device, postStyle } = useStore((state) => state);
  const location = useLocation();
  const currentView = location.pathname.split('/').at(-2);
  const { accountComments: myPost } = useAccountComments({
    filter: currentView === 'comments' ? isReply : currentView === 'posts' ? isPost : undefined,
  });
  const blockedCids = useMemo(
    () => Object.keys(profile?.blockedCids || {}) || [],
    [profile?.blockedCids]
  );
  const { comments: blockedFeeds } = useComments({
    commentCids: blockedCids,
  });
  const navOptions =
    device !== 'mobile'
      ? [
          { label: 'overview', link: 'overview', optional: 'profile' },
          { label: 'posts', link: 'posts' },
          { label: 'comments', link: 'comments' },
          { label: 'history', link: 'history' },
          { label: 'saved', link: 'saved' },
          { label: 'hidden', link: 'hidden' },
          { label: 'upvoted', link: 'upvoted' },
          { label: 'downvoted', link: 'downvoted' },
          { label: 'awards received', link: 'gilded' },
          { label: 'awards given', link: 'gilded/given', optional: 'given' },
        ]
      : [
          { label: 'overview', link: 'overview', optional: 'profile' },
          { label: 'posts', link: 'posts' },
          { label: 'comments', link: 'comments' },
          { label: 'Moderation', link: 'moderation' },
          { label: 'saved', link: 'saved' },
          { label: 'hidden', link: 'hidden' },
        ];
  const feeds = myPost ? [...myPost].reverse() : [];
  const fullNav = !(currentView === 'overview' || currentView === 'profile');

  return (
    <Layout name={{ label: getUserName(profile?.author) || 'Profile', value: location?.pathname }}>
      {device !== 'mobile' ? (
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
          <FeedContent
            type={fullNav ? 'false' : 'true'}
            top={<FeedSort hideControl />}
            sidebar={<SideBar profile={profile} avatar={authorAvatarImageUrl} />}
            feeds={currentView === 'hidden' ? blockedFeeds : feeds}
            loader={
              <Post
                loading={true}
                mode={currentView === 'overview' || currentView === 'profile' ? 'card' : 'classic'}
                key={Math.random()}
              />
            }
            content={(index, feed) => (
              <Post
                post={feed}
                index={index}
                key={feed?.cid || index}
                mode={currentView === 'overview' || currentView === 'profile' ? 'card' : 'classic'}
              />
            )}
            disableBlocked={currentView === 'hidden'}
          />
        </>
      ) : (
        <div>
          <div className={styles.mobile_profile_header}>
            <header className={styles.mobile_profile_header2}>
              <div className={styles.mobile_profile_header_banner}>
                <div className={styles.mobile_profile_header_avatar}>
                  <Avatar
                    avatar={authorAvatarImageUrl}
                    height={64}
                    width={64}
                    sx={{
                      margin: 'auto',
                    }}
                  />
                </div>
                <h3 className={styles.mobile_profile_header_name}>
                  {' '}
                  {getUserName(profile?.author)}
                </h3>
                <div className={styles.mobile_profile_header_detail}>
                  <span>
                    <span>{numFormatter(profile?.karma?.score)} karma</span>
                  </span>
                </div>

                <Link to="/settings/">
                  Edit Profile <MdEdit />
                </Link>
              </div>
              <div className={styles.mobile_profile_header_navigation}>
                <nav>
                  {navOptions?.map((option, index) => (
                    <Link to={`/profile/${option?.link}/`} key={index}>
                      <div
                        active={String(
                          currentView === option?.link || currentView === option?.optional
                        )}
                        className={styles.mobile_profile_header_navigation_link}
                      >
                        {option?.label}
                      </div>
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <FeedSort />
            <InfiniteScroll
              feeds={currentView === 'hidden' ? blockedFeeds : feeds}
              loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
              content={(index, feed) => (
                <Post index={index} post={feed} key={feed?.cid || index} mode="card" />
              )}
              disableBlocked={currentView === 'hidden'}
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
