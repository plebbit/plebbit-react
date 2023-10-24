import {
  useAccount,
  useAccountComments,
  useAuthorAvatar,
  useComments,
} from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useMemo } from 'react';
import useStore from '../../store/useStore';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import styles from './profile.module.css';
import getUserName from '../../utils/getUserName';
import FeedContent from '../../components/container/FeedContent';
import FeedSort from '../../components/Post/FeedSort';
import SideBar from './sideBar';
import Post from '../../components/Post';
import Avatar from '../../components/Avatar';
import numFormatter from '../../utils/numberFormater';
import { MdEdit } from 'react-icons/md';
import InfiniteScroll from '../../components/InfiniteScroll';
import useAppTitle from '../../hooks/useAppTitle';

// don't put inside component or will cause rerenders
const isReply = (comment) => !!comment.parentCid;
const isPost = (comment) => !comment.parentCid;

const Profile = () => {
  const profile = useAccount();
  const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
  const { device, postStyle, setAppTitle } = useStore((state) => state);
  const view = useParams()?.view ?? 'profile';
  const { accountComments: myPost } = useAccountComments({
    filter: view === 'comments' ? isReply : view === 'posts' ? isPost : undefined,
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
  const fullNav = !(view === 'overview' || view === 'profile');

  useAppTitle(getUserName(profile?.author), profile);

  return (
    <>
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
                      active={String(view === option?.optional || view === option?.link)}
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
            feeds={view === 'hidden' ? blockedFeeds : feeds}
            loader={
              <Post
                loading={true}
                mode={view === 'overview' || view === 'profile' ? 'card' : 'classic'}
                key={Math.random()}
              />
            }
            content={(index, feed) => (
              <Post
                post={feed}
                index={index}
                key={feed?.cid || index}
                mode={view === 'overview' || view === 'profile' ? 'card' : 'classic'}
              />
            )}
            disableBlocked={view === 'hidden'}
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
                    style={{
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
                        active={String(view === option?.link || view === option?.optional)}
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
              feeds={view === 'hidden' ? blockedFeeds : feeds}
              loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
              content={(index, feed) => (
                <Post index={index} post={feed} key={feed?.cid || index} mode="card" />
              )}
              disableBlocked={view === 'hidden'}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
