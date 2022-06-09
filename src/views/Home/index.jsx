import React, { useContext } from 'react';
import { Box, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
import Post from '../../components/Post/index2';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import subPlebbitsData from '../../components/data/subPlebbits';
import InfiniteScroll from '../../components/InfiniteScroll';

const Home = () => {
  const { isLoggedIn, postStyle, feedSort, device } = useContext(ProfileContext);
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mobileMainColor = useColorModeValue('lightMobileText', 'darkMobileText');
  const mainMobileBg = useColorModeValue('white', 'black');
  const postHeadColor = useColorModeValue('#1a1a1b', '#0079d3');

  const { feed, loadMore, hasMore } = useFeed(
    subPlebbitsData?.map((x) => x.value),
    feedSort
  );

  const feeds = feed;

  return (
    <>
      {device !== 'mobile' ? (
        <Flex
          maxW="100%"
          padding="20px 24px"
          boxSizing="border-box"
          justifyContent="center"
          margin="0 auto"
        >
          <Box width={postStyle === 'card' ? '640px' : '100%'} minW="0">
            {!isLoggedIn ? (
              <>
                <Box
                  pb="10px"
                  fontSize="14px"
                  textTransform="unset"
                  lineHeight="18px"
                  color="#878A8c"
                  position="relative"
                  width="100%"
                >
                  Popular posts
                </Box>
                <FeedSort />
              </>
            ) : (
              <>
                {/* Create Post Bar */}
                <CreatePostBar />
                {/* feed sorter bar */}
                <FeedSort />
              </>
            )}

            <Box minHeight="1000px" width="100%">
              <InfiniteScroll
                hasMore={hasMore}
                loadMore={loadMore}
                content={(feed) => (
                  <Post post={feed} key={`${Math.random()}${feed?.cid}`} mode={postStyle} />
                )}
                feeds={feeds}
                loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
              />
            </Box>
          </Box>

          <SideBar bg={bg} />
        </Flex>
      ) : (
        <Box bg={mainMobileBg}>
          <Text
            fontSize="26px"
            fontWeight="700"
            lineHeight="31px"
            margin="0"
            color={mobileMainColor}
            padding="20px 12px 2px"
          >
            Popular
          </Text>
          <FeedSort />
          <Box bg={mainMobileBg}>
            <Box>
              <Box position="relative" bg={mainMobileBg}>
                <Link
                  href="#"
                  bottom="0"
                  left="0"
                  pointerEvents="all"
                  position="absolute"
                  right="0"
                  top="0"
                />
                <Box pointerEvents="none" position="relative">
                  <Box paddingTop="0">
                    <Flex alignItems="center">
                      <Box
                        color="#a5a4a4"
                        maxW="100%"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        position="relative"
                        verticalAlign="middle"
                        flex="1 0"
                        _after={{
                          background: 'linear-gradient(90deg,hsla(0,0%,100%,0) 0,#fff 70%)',
                          content: `""`,
                          top: '0',
                          right: '0',
                          bottom: '0',
                          width: '3em',
                        }}
                      >
                        <Box
                          color="#798389"
                          fontSize="14px"
                          lineHeight="18px"
                          paddingBottom="4px"
                          overflow="hidden"
                          paddingRight="3em"
                          padding="8px 16px"
                        >
                          <Flex alignItems="center">
                            <Flex
                              alignItems="center"
                              fontSize="14px"
                              fontWeight="500"
                              lineHeight="18px"
                              color={postHeadColor}
                            >
                              <Flex
                                bg={mainMobileBg}
                                alignItems="center"
                                borderRadius="50%"
                                height="24px"
                                justifyContent="center"
                                marginRight="8px"
                                overflow="hidden"
                                verticalAlign="middle"
                                width="24px"
                              >
                                <Image
                                  alt="plebbit-post"
                                  overflow="hidden"
                                  whiteSpace="nowrap"
                                  src="https://bit.ly/dan-abramov"
                                />
                              </Flex>
                              p/plebbit_test
                            </Flex>
                            <Box
                              _after={{
                                color: '#818384',
                                content: `"."`,
                                margin: '0 4px',
                                position: 'relative',
                                top: '-1px',
                                verticalAlign: 'middle',
                              }}
                              fontSize="14px"
                              lineHeight="18px"
                              color="#798389"
                            />
                            <Box>14h</Box>
                          </Flex>
                        </Box>
                      </Box>
                      <Box padding="0" flex="0 0 auto" whiteSpace="nowrap" />
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Home;
