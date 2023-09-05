import React, { useEffect, useState } from 'react';
import { Box, Flex, Icon, Text, useColorModeValue, useToast, Button } from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import Post from '../../components/Post';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import {
  useSubscribe,
  useFeed,
  useSubplebbit,
  usePublishSubplebbitEdit,
  useSubplebbitStats,
  useBlock,
  useAccountSubplebbits,
  useAccount,
} from '@plebbit/plebbit-react-hooks';
import { useLocation, useParams } from 'react-router-dom';
import SideBar from './sideBar';
import getChallengeAnswersFromUser from '../../utils/getChallengeAnswersFromUser';
import InfiniteScroll from '../../components/InfiniteScroll';
import Layout from '../../components/layout';
import getIsOnline from '../../utils/getIsOnline';
import Avatar from '../../components/Avatar';
import Link from '../../components/Link';
import { PlebLogo } from '../../components/svgs';
import { getAddress } from '../../utils/getUserName';
import onError from '../../utils/onError';
import logger from '../../utils/logger';
import SubStyleSide from './subStyleSide';
import useStateString from '../../hooks/useStateString';
import { GoMute } from 'react-icons/go';
import useStore from '../../store/useStore';

const SubPlebbit = ({ match }) => {
  const { accountSubplebbits } = useAccountSubplebbits();
  const profile = useAccount();
  const { postStyle, feedSort, device } = useStore((state) => state);
  const mainBg = useColorModeValue('lightBody', 'darkBody');
  const pseuBg = useColorModeValue('#DAE0E6', '#030303');
  const border1 = useColorModeValue('#efefed', '#353535');
  const subPlebbitSubTitle = useColorModeValue('metaTextLight', 'metaTextDark');
  const subPlebbitBorder = useColorModeValue('borderLight1', 'borderDark1');
  // const inactiveSubTitle = useColorModeValue('lightText1', 'darkText1');
  const mobileMainColor = useColorModeValue('lightMobileText', 'darkMobileText');
  const mainMobileBg = useColorModeValue('white', 'black');
  const separatorColor = useColorModeValue('#7c7c7c', 'darkIcon');

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
  const [subLoading, setSubLoading] = useState(false);
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
      challengeAnswers = await getChallengeAnswersFromUser(challenges);
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

  const stateString = useStateString(subPlebbit);

  return (
    <Layout
      background={
        data?.suggested?.backgroundUrl && `url(${data?.suggested?.backgroundUrl}) repeat center top`
      }
      stateString={feeds?.length ? '' : stateString}
      name={{ label: data?.title || 'Subplebbit', value: location?.pathname }}
    >
      {showStyleBar && <SubStyleSide />}
      <>
        {device !== 'mobile' ? (
          <Flex flexDirection="column" minH="calc(100vh - 48px)">
            <Box
              minH="100%"
              overflow="hidden"
              position="relative"
              flex="none"
              _after={{
                content: `" "`,
                position: 'fixed',
                height: '100%',
                top: '0',
                left: '0',
                backgroundColor: pseuBg,
                willChange: 'transform',
              }}
            />
            <Box zIndex="3">
              <Link to={`/p/${data?.address}/`}>
                <Flex
                  background={`${data?.suggested?.primaryColor || 'rgb(51, 168, 255)'} url(${
                    data?.suggested?.bannerUrl
                  }) no-repeat center / cover`}
                  filter="none"
                  height="128px"
                  padding="8px 16px"
                  margin="0 auto"
                  minW="260px"
                />
              </Link>
              <Box backgroundColor={mainBg} width="100%">
                <Flex
                  maxWidth="984px"
                  flexDirection="column"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  margin="0 auto"
                  padding="0 16px 0 24px"
                >
                  <Flex
                    marginTop="-14px"
                    marginBottom="12px"
                    alignItems={device !== 'mobile' ? 'flex-start' : 'center'}
                    flexDir={device !== 'mobile' ? 'row' : 'column'}
                  >
                    <Avatar
                      width={76}
                      height={76}
                      border="1px solid #fff"
                      badge
                      isOnline={isOnline}
                      avatar={data?.suggested?.avatarUrl}
                    />

                    <Flex
                      boxSizing="border-box"
                      alignContent="flex-start"
                      flexDirection={device !== 'mobile' ? 'row' : 'column'}
                      flex="1"
                      paddingLeft="16px"
                      marginTop="24px"
                      justifyContent={device !== 'mobile' ? 'space-between' : 'center'}
                      width={device !== 'mobile' ? '"calc(100% - 80px)"' : '100%'}
                    >
                      <Box paddingRight="24px" box-sizing="border-box">
                        <Box
                          fontSize="28px"
                          fontWeight="700"
                          lineHeight="32px"
                          padding="0 2px 4px 0"
                          width="100%"
                        >
                          {data?.title || getAddress(data?.address)}
                        </Box>
                        <Box
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          color={subPlebbitSubTitle}
                          wordBreak="break-all"
                        >
                          p/{data?.address}
                        </Box>
                      </Box>
                      <Flex alignItems="center" mt="10px">
                        <Box width="96px">
                          <Button
                            variant="outline"
                            borderRadius="9999px"
                            padding="4px 16px"
                            minW="32px"
                            minH="32px"
                            height="auto"
                            width="100%"
                            lineHeight="17px"
                            fontWeight="700"
                            fontSize="14px"
                            loading={subLoading}
                            onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                            borderColor={data?.suggested?.secondaryColor}
                            color={data?.suggested?.secondaryColor}
                          >
                            {subscribed ? 'Joined' : 'Join'}
                          </Button>
                        </Box>
                        <Box ml="8px">
                          {blocked ? (
                            <Button
                              borderRadius="9999px"
                              padding="4px 16px"
                              minW="32px"
                              minH="32px"
                              height="auto"
                              width="100%"
                              lineHeight="17px"
                              fontWeight="700"
                              fontSize="14px"
                              bg="transparent"
                              borderColor={data?.suggested?.secondaryColor}
                              onClick={() => (blocked ? unblock() : block())}
                            >
                              <Icon
                                mr="8px"
                                color={data?.suggested?.secondaryColor}
                                verticalAlign="middle"
                                width="20px"
                                height="20px"
                                as={GoMute}
                              />
                              Muted
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              padding="5px"
                              height="33px"
                              width="33px"
                              bg="transparent"
                              borderColor={data?.suggested?.secondaryColor}
                              borderRadius="100%"
                            >
                              <Icon
                                color={data?.suggested?.secondaryColor}
                                verticalAlign="middle"
                                width="20px"
                                height="20px"
                                as={FaBell}
                              />
                            </Button>
                          )}
                        </Box>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Box
                    position="static"
                    bg="inherit"
                    marginLeft="-16px"
                    marginTop="-4px"
                    bottom="0"
                    right="0"
                    left="0"
                  >
                    <Flex
                      maxW="1200px"
                      padding="0 16px"
                      alignItems="center"
                      justifyContent="space-between"
                      margin="0 auto"
                      minW="260px"
                    >
                      <Box>
                        <Box
                          borderBottom={`3px solid`}
                          borderColor={subPlebbitBorder}
                          paddingBottom="1px"
                          fontSize="14px"
                          fontWeight="500"
                          lineHeight="18px"
                          margin="0 5px"
                          paddingLeft="8px"
                          paddingRight="8px"
                          paddingTop="4px"
                          ml="0"
                        >
                          Posts
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
              <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
                <Box width={postStyle === 'card' ? '640px' : '100%'} minWidth="0">
                  {/* Create Post Bar */}
                  <CreatePostBar address={data?.address} />
                  {/* feed sort bar */}
                  <FeedSort subplebbitColor={data?.suggested?.secondaryColor} />
                  {/* feed list */}

                  <Box minHeight="1000px" width="100%">
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
                  </Box>
                </Box>
                {/* side bar */}
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
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex>
            <Box bg={mainMobileBg} borderBottom={`1px solid ${border1}`} width="100%">
              <Box
                backgroundColor={data?.suggested?.primaryColor || 'rgb(51, 168, 255)'}
                backgroundImage={data?.suggested?.bannerUrl}
                pos="relative"
                width="100%"
                paddingBottom="20%"
                mb="48px"
                backgroundPosition="50%"
                backgroundSize="cover"
                overflowY="visible"
                height="120px"
              >
                <Box
                  w="80px"
                  height="80px"
                  position="absolute"
                  left="50%"
                  ml="-40px"
                  bottom="-40px"
                  borderRadius="40px"
                  border="2px solid #fff"
                >
                  <Box
                    backgroundColor={data?.suggested?.primaryColor || '#24a0ed'}
                    backgroundRepeat="no-repeat"
                    borderRadius="50%"
                    height="100%"
                    pos="relative"
                    width="100%"
                  >
                    <Box height="100%" width="100%">
                      <PlebLogo />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box fontSize="14px" textAlign="center" padding="0 12px">
                <Box fontSize="20px" fontWeight="700" padding="0 20px" color={mobileMainColor}>
                  {data?.title || getAddress(data?.address)}
                </Box>
                <Box color="#a5a4a4">p/{data?.address}</Box>
                <Box mt="10px" fontSize="14px" padding="0 12px">
                  <Box>
                    {' '}
                    {stats?.allActiveUserCount || 0} member
                    {`${stats?.allActiveUserCount > 0 ? 's' : ''}`} •{' '}
                    {stats?.hourActiveUserCount || 0} online
                  </Box>
                  <Flex justifyContent="center" mt="8px" mb="10px">
                    <Button
                      bg="transparent"
                      content={subscribed ? 'Joined' : 'Join'}
                      padding="4px 32px"
                      minW="32px"
                      minH="32px"
                      loading={subLoading}
                      onClick={subscribed ? handleUnSubscribe : handleSubscribe}
                      color="#24a0ed"
                    />
                  </Flex>
                  <Flex alignItems="center" flexFlow="row nowrap">
                    <Box
                      color="#006cbf"
                      borderBottom="2px solid #006cbf"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      fontSize="14px"
                      fontWeight="600"
                      lineHeight="17px"
                      paddingBottom="9px"
                      flex="1 1 1%"
                      textAlign="center"
                      padding="0 8px"
                    >
                      POSTS
                    </Box>
                    <Box
                      color="#6a6d6f"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace="nowrap"
                      fontSize="14px"
                      fontWeight="600"
                      lineHeight="17px"
                      paddingBottom="9px"
                      flex="1 1 1%"
                      textAlign="center"
                      padding="0 8px"
                      as={Link}
                      to={`/p/${data?.address}/about/`}
                    >
                      ABOUT
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box>
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
                  loader={
                    <Post type="subPlebbit" loading={true} mode={postStyle} key={Math.random()} />
                  }
                />
              </Box>
            </Box>
          </Flex>
        )}
      </>
    </Layout>
  );
};

export default SubPlebbit;
