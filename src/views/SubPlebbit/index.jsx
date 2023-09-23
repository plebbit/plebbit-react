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

const Subplebbit = () => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { postStyle, feedSort, device } = useStore((state) => state);
  const params = useParams();
  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: [params?.subplebbitAddress],
    sortType: feedSort,
  });
  const subPlebbit = useSubplebbit({ subplebbitAddress: params?.subplebbitAddress });
  const feeds = feed;
  const [data, setData] = useState({ address: params?.subplebbitAddress, ...subPlebbit });
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const role = accountSubplebbits[subPlebbit?.address]?.role?.role;
  const location = useLocation();
  const isOnline = getIsOnline(subPlebbit?.updatedAt);
  const allowedSpecial = role === 'owner' || role === 'moderator' || role === 'admin';
  const showStyleBar = location?.search === '?styling=true';
  const stats = useSubplebbitStats({ subplebbitAddress: subPlebbit?.address });
  const { blocked, unblock, block } = useBlock({ address: subPlebbit?.address });

  useEffect(() => {
    setData({ ...data, ...subPlebbit });
  }, [subPlebbit]);

  const onChallengeVerification = (challengeVerification) => {
    if (challengeVerification.challengeSuccess === true) {
      toast({
        title: 'Accepted.',
        description: 'Action accepted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      logger('challengeSuccess', { challengeVerification });
    } else if (challengeVerification.challengeSuccess === false) {
      logger(
        'challengefailed',
        {
          reason: challengeVerification.reason,
          errors: challengeVerification.challengeErrors,
        },
        'error'
      );
      toast({
        title: challengeVerification.reason ? challengeVerification.reason : 'Declined.',
        description: challengeVerification.challengeErrors
          ? challengeVerification.challengeErrors.join(',')
          : 'Challenge Verification Failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onChallenge = async (challenges, subplebbitEdit) => {
    let challengeAnswers = [];
    try {
      // ask the user to complete the challenges in a modal window
      challengeAnswers = await GetChallengeAnswersFromUser(challenges);
    } catch (error) {
      // if  he declines, throw error and don't get a challenge answer
      logger('failChallenge', error, 'error');
      toast({
        title: 'Declined.',
        description: 'Action Declined',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (challengeAnswers) {
      await subplebbitEdit.publishChallengeAnswers(challengeAnswers);
    }
  };

  const { subscribe, unsubscribe, subscribed } = useSubscribe({
    subplebbitAddress: subPlebbit?.address,
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

  const currentView = location.pathname.split('/')[3];
  const stateString = useStateString(subPlebbit);
  return (
    <Layout
      background={
        data?.suggested?.backgroundUrl && `url(${data?.suggested?.backgroundUrl}) repeat center top`
      }
      stateString={feeds?.length ? '' : stateString}
      name={{ label: data?.title || 'Subplebbit', value: location?.pathname }}
    >
      {device !== 'mobile' ? (
        <>
          {/* banner */}
          <span
            className={styles.sub_banner}
            style={{
              background: `${data?.suggested?.primaryColor || 'rgb(51, 168, 255)'} url(${
                data?.suggested?.bannerUrl
              }) no-repeat center / cover`,
            }}
          >
            <Link to={`/p/${data?.address}/`} className={styles.sub_banner2}>
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
                    <h1 className={styles.sub_title}>{data?.title || getAddress(data?.address)}</h1>
                    <h2 className={styles.sub_address}>{`p/${data?.address}`}</h2>
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
          <div
            maxW="100%"
            padding="20px 24px"
            boxSizing="border-box"
            justifyContent="center"
            margin="0 auto"
            className={styles.wrapper}
          >
            <div
              className={styles.wrapper2}
              type={postStyle === 'card' ? 'true' : 'false'}
              minW="0"
            >
              {/* Create Post Bar */}
              <CreatePostBar address={data?.address} />
              {/* feed sorter bar */}
              <FeedSort subplebbitColor={data?.suggested?.secondaryColor} />

              <div className={styles.home_feed}>
                <InfiniteScroll
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
                />
              </div>
            </div>
            <SideBar
              profile={profile}
              handleSaveChanges={handleSaveChanges}
              loading={loading}
              data={data}
              setData={setData}
              subPlebbit={data}
              allowedSpecial={allowedSpecial}
              blocked={blocked}
              handleOption={handleOption}
            />
          </div>
        </>
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
              <div className={styles.mobile_sub_add}>{getAddress(data?.address)}</div>
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
                <Link className={styles.mobile_sub_nav_item} to={`/p/${data?.address}/`}>
                  <div className={styles.mobile_sub_nav_text} active={String(currentView === '')}>
                    POSTS
                  </div>
                </Link>
                <Link className={styles.mobile_sub_nav_item} to={`/p/${data?.address}/about/`}>
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
