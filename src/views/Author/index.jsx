import {
  useAccount,
  useAccountComments,
  useAuthor,
  useAuthorAvatar,
  useAuthorComments,
  useBlock,
  useComments,
} from '@plebbit/plebbit-react-hooks';
import React, { useMemo } from 'react';
import useStore from '../../store/useStore';
import { Link, useLocation, useParams } from 'react-router-dom';
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
import useAppTitle from '../../hooks/useAppTitle';

// don't put inside component or will cause rerenders
const isReply = (comment) => !!comment.parentCid;
const isPost = (comment) => !comment.parentCid;

const Profile = () => {
  const params = useParams();
  const { device, postStyle } = useStore((state) => state);
  const location = useLocation();
  const author = useAuthor({
    commentCid: params?.commentCid,
    authorAddress: params?.authorAddress,
  });
  const { imageUrl } = useAuthorAvatar({ author: author?.author });

  const view = useParams()?.view ?? params?.commentCid;
  const { authorComments, hasMore, loadMore } = useAuthorComments({
    commentCid: params?.commentCid,
    authorAddress: params?.authorAddress,
    filter: view === 'comments' ? isReply : view === 'posts' ? isPost : undefined,
  });
  const { blocked, unblock, block } = useBlock({ address: params?.authorAddress });

  const handleOption = (val) => {
    if (val?.id === 'mute') {
      blocked ? unblock() : block();
    }
  };

  const navOptions =
    device !== 'mobile'
      ? [
          { label: 'overview', link: 'overview', optional: params?.commentCid },
          { label: 'posts', link: 'posts' },
          { label: 'comments', link: 'comments' },
        ]
      : [
          { label: 'overview', link: 'overview', optional: params?.commentCid },
          { label: 'posts', link: 'posts' },
          { label: 'comments', link: 'comments' },
          { label: 'Moderation', link: 'moderation' },
        ];
  const feeds = authorComments ? [...authorComments].reverse() : [];
  const fullNav = !(view === 'overview' || view === 'profile');
  const address = `/u/${params?.authorAddress}/c/${params?.commentCid}`;

  useAppTitle(getUserName(author?.author) || 'Profile', author);

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
                      to={`${address}/${option?.link}/`}
                      active={String(view === option?.link || view === option?.optional)}
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
            sidebar={
              <SideBar
                profile={author}
                avatar={imageUrl}
                handleOption={handleOption}
                blocked={blocked}
              />
            }
            feeds={feeds}
            loader={
              <Post
                loading={true}
                mode={view === 'overview' || view === 'profile' ? 'card' : 'classic'}
                key={Math.random()}
              />
            }
            hasMore={hasMore}
            loadMore={loadMore}
            content={(index, feed) => (
              <Post
                post={feed}
                index={index}
                key={feed?.cid || index}
                mode={view === 'overview' || view === 'profile' ? 'card' : 'classic'}
              />
            )}
          />
        </>
      ) : (
        <div>
          <div className={styles.mobile_profile_header}>
            <header className={styles.mobile_profile_header2}>
              <div className={styles.mobile_profile_header_banner}>
                <div className={styles.mobile_profile_header_avatar}>
                  <Avatar
                    avatar={imageUrl}
                    height={64}
                    width={64}
                    sx={{
                      margin: 'auto',
                    }}
                  />
                </div>
                <h3 className={styles.mobile_profile_header_name}>{getUserName(author?.author)}</h3>
                <div className={styles.mobile_profile_header_detail}>
                  <span>
                    <span>{numFormatter(author?.author?.karma?.score) || 0} karma</span>
                  </span>
                </div>
              </div>
              <div className={styles.mobile_profile_header_navigation}>
                <nav>
                  {navOptions?.map((option, index) => (
                    <Link to={`${address}/${option?.link}/`} key={index}>
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
              feeds={feeds}
              hasMore={hasMore}
              loadMore={loadMore}
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
