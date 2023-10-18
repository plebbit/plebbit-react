import {
  useAccount,
  useAccountSubplebbits,
  useBlock,
  useFeed,
  usePublishSubplebbitEdit,
  useSubplebbit,
  useSubplebbitStats,
  useSubscribe,
} from '@plebbit/plebbit-react-hooks';
import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import getIsOnline from '../../utils/getIsOnline';
import logger from '../../utils/logger';
import GetChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import useStateString from '../../hooks/useStateString';
import onError from '../../utils/onError';
import Layout from '../../components/layout';
import styles from './subplebbit.module.css';
import Avatar from '../../components/Avatar';
import { getAddress } from '../../utils/getUserName';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import SideBar from './sideBar';
import truncateString from '../../utils/truncateString';
import Dot from '../../components/Dot';
import CreatePostBar from '../../components/CreatePost/createPostBar';
import FeedContent from '../../components/container/FeedContent';
import onChallenge from '../../utils/onChallenge';
import onChallengeVerification from '../../utils/onChallengeVerification';
import SubStyleSide from './subStyleSide';

const Subplebbit = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { postStyle, device } = useStore((state) => state);
  const sortType = useParams()?.sortType ?? 'hot';
  const { subplebbitAddress } = useParams();
  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: [subplebbitAddress],
    sortType: sortType,
  });
  const subPlebbit = useSubplebbit({ subplebbitAddress });
  const feeds = feed;
  const [data, setData] = useState({ address: subplebbitAddress, ...subPlebbit });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const role = accountSubplebbits[subplebbitAddress]?.role?.role;
  const { pathname } = useLocation();
  const isOnline = getIsOnline(subPlebbit?.updatedAt);
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const stats = useSubplebbitStats({ subplebbitAddress: subplebbitAddress });
  const { blocked, unblock, block } = useBlock({ address: subplebbitAddress });

  useEffect(() => {
    setData({ ...data, ...subPlebbit });
  }, [subPlebbit]);

  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress,
  });

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleUnSubscribe = async () => {
    try {
      await unsubscribe();
    } catch (error) {
      toast({
        title: 'Unsubscribed.',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const editSubplebbitOptions = {
    ...data,
    onChallenge,
    onChallengeVerification,
    onError,
  };

  const { publishSubplebbitEdit } = usePublishSubplebbitEdit(editSubplebbitOptions);
  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await publishSubplebbitEdit();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Supplebbit Edit declined.',
        description: error?.toString(),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOption = (val) => {
    if (val?.id === 'mute') {
      blocked ? unblock() : block();
    }
  };

  const currentView = pathname.split('/')[3];
  const stateString = useStateString(subPlebbit);

  return (
    <Layout
      background={
        data?.suggested?.backgroundUrl && `url(${data?.suggested?.backgroundUrl}) repeat center top`
      }
      stateString={feeds?.length ? '' : stateString}
      name={{ label: data?.title || 'Subplebbit', value: pathname }}
    >
      {device !== 'mobile' ? (
        <div>
          {/* banner */}
          <span
            className={styles.sub_banner}
            style={{
              background: `${data?.suggested?.primaryColor || 'rgb(51, 168, 255)'} url(${
                data?.suggested?.bannerUrl
              }) no-repeat center / cover`,
            }}
          >
            <Link to={`/p/${subplebbitAddress}/`} className={styles.sub_banner2}>
              <div className={styles.sub_banner3}>
                <div className={styles.sub_banner4}></div>
              </div>
            </Link>
          </span>
          <div className={styles.sub_banner_2}>
            <div className={styles.sub_banner_22}>
              <div className={styles.sub_banner_23}>
                <div className={styles.sub_avatar}>
                  <Avatar
                    width={76}
                    height={76}
                    badge
                    isOnline={isOnline}
                    avatar={data?.suggested?.avatarUrl}
                  />
                </div>
                <div className={styles.sub_detail}>
                  <div className={styles.sub_detail_left}>
                    <h1 className={styles.sub_title}>
                      {data?.title || getAddress(subplebbitAddress)}
                    </h1>
                    <h2 className={styles.sub_address}>{`p/${subplebbitAddress}`}</h2>
                  </div>
                  <div className={styles.sub_detail_right}>
                    <div className={styles.sub_join_wrap}>
                      <button
                        disabled={loading}
                        onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                        role="button"
                        tabIndex="0"
                        className={styles.sub_join_btn}
                        style={{
                          border: data?.suggested?.secondaryColor,
                          color: data?.suggested?.secondaryColor,
                        }}
                      >
                        {subscribed ? 'Joined' : 'Join'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FeedContent
            type={postStyle === 'card' ? 'true' : 'false'}
            top={
              <>
                {/* Create Post Bar */}
                <CreatePostBar address={subplebbitAddress} />
                {/* feed sorter bar */}
                <FeedSort subplebbitColor={data?.suggested?.secondaryColor} />
              </>
            }
            hasMore={hasMore}
            loadMore={loadMore}
            content={(index, feed) => (
              <Post
                allowedSpecial={allowedSpecial}
                type="subPlebbit"
                post={feed}
                index={index}
                key={feed?.cid || index}
                mode={postStyle}
              />
            )}
            feeds={feeds}
            loader={
              <Post
                stateString={stateString}
                type="subPlebbit"
                loading={true}
                mode={postStyle}
                key={Math.random()}
              />
            }
            sidebar={
              <SideBar
                profile={profile}
                handleSaveChanges={handleSaveChanges}
                loading={loading}
                data={data}
                setData={setData}
                subPlebbit={subPlebbit}
                allowedSpecial={allowedSpecial}
                blocked={blocked}
                handleOption={handleOption}
              />
            }
          />
        </div>
      ) : (
        <div>
          <div className={styles.mobile_sub_header}>
            <div
              className={styles.mobile_sub_banner}
              style={{
                backgroundColor: data?.suggested?.primaryColor || 'rgb(51, 168, 255)',
                backgroundImage: data?.suggested?.bannerUrl,
              }}
            >
              <div className={styles.mobile_sub_avatar}>
                <Avatar
                  width={76}
                  height={76}
                  badge
                  isOnline={isOnline}
                  avatar={data?.suggested?.avatarUrl}
                />
              </div>
            </div>
            <div className={styles.mobile_sub_header_text}>
              {data?.title && <h4 className={styles.mobile_sub_title}>{data?.title}</h4>}
              <div className={styles.mobile_sub_add}>{getAddress(subplebbitAddress)}</div>
            </div>
            <div className={styles.mobile_sub_header_description}>
              {truncateString(data?.description, 100, '...')} {`  `}
              <button
                className={styles.mobile_sub_header_description_more}
                style={{
                  color: data?.suggested?.primaryColor || 'rgb(51, 168, 255)',
                }}
              >
                More
              </button>
            </div>
            <div className={[styles.mobile_sub_header_text, styles.m_top].join(' ')}>
              <span>
                <strong>{stats?.allActiveUserCount || 0}</strong> members
              </span>
              <span>
                <Dot />
                <strong>{stats?.hourActiveUserCount || 0}</strong> online
              </span>
              <div className={styles.mobile_sub_join}>
                <button
                  onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                  className={styles.mobile_sub_join_btn}
                  disabled={loading}
                >
                  {subscribed ? 'Joined' : 'Join'}
                </button>
              </div>
              <nav className={styles.mobile_sub_nav}>
                <Link className={styles.mobile_sub_nav_item} to={`/p/${subplebbitAddress}/`}>
                  <div className={styles.mobile_sub_nav_text} active={String(currentView === '')}>
                    POSTS
                  </div>
                </Link>
                <Link className={styles.mobile_sub_nav_item} to={`/p/${subplebbitAddress}/about/`}>
                  <div
                    className={styles.mobile_sub_nav_text}
                    active={String(currentView === 'about')}
                  >
                    ABOUT
                  </div>
                </Link>
              </nav>
            </div>
          </div>
          {/* Create Post Bar */}
          <CreatePostBar />
          {/* feed sort bar */}
          <FeedSort />
          {/* feed list */}
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={loadMore}
            content={(index, feed) => (
              <Post
                type="subPlebbit"
                post={feed}
                index={index}
                key={feed?.cid || index}
                mode={postStyle}
                allowedSpecial={allowedSpecial}
              />
            )}
            feeds={feeds}
            loader={<Post type="subPlebbit" loading={true} mode={postStyle} key={Math.random()} />}
          />
        </div>
      )}
    </Layout>
  );
};

export default Subplebbit;
