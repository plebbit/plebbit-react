import React, { useContext } from 'react';
import { Box, Button, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react';
// import { useHistory } from 'react-router';
import Post from '../../components/Post/index2';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import subPlebbitsData from '../../components/data/subPlebbits';
import InfiniteScroll from '../../components/InfiniteScroll';
import { MdCircleNotifications } from 'react-icons/md';

const Home = () => {
  const { isLoggedIn, postStyle, feedSort } = useContext(ProfileContext);
  const borderColor = useColorModeValue('#ccc', '#343536');
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainColor = useColorModeValue('lightText2', 'darkText1');
  const iconColor = useColorModeValue('lightIcon', 'darkIcon');
  const { feed, loadMore, hasMore } = useFeed(
    subPlebbitsData?.map((x) => x.value),
    feedSort
  );

  const feeds = feed;

  return (
    <Flex
      maxW="100%"
      padding="20px 24px"
      boxSizing="border-box"
      justifyContent="center"
      margin="0 auto"
    >
      <Box width={postStyle === 'card' ? '640px' : '100%'} minW="0">
        <Box
          padding="16px 12px"
          bg={bg}
          borderRadius="4px"
          border={`1px solid ${borderColor}`}
          color={mainColor}
          marginBottom="16px"
          overflow="hidden"
          position="relative"
        >
          <Text fontSize="12px" fontWeight="500" lineHeight="16px" margin="0 0 12px 2px">
            NEW NOTIFICATION
          </Text>
          <Button
            position="absolute"
            color={iconColor}
            height="24px"
            width="24px"
            right="14px"
            top="12px"
            background="transparent"
            borderRadius="2px"
            border="none"
            padding="2px"
          >
            X
          </Button>
          <Flex alignItems="center" marginBottom="6px">
            <Flex
              height="90px"
              justifyContent="center"
              flex="1"
              margin="0 8px"
              position="relative"
              width="100%"
            >
              <Flex
                opacity="1"
                transform="translateX(0)"
                borderRadius="10px"
                border={`1px solid ${borderColor}`}
                boxSizing="border-box"
                transition="transform .2s, opacity .2s"
                width="100%"
                willChange="transform, opacity"
              >
                <Box flex="1">
                  <Flex>
                    <Box pos="relative" paddingRight="8px">
                      <Icon as={MdCircleNotifications} w={12} h={12} />
                    </Box>
                    <Box flex="1 0">
                      <Flex alignItems="center" justifyContent="space-between" marginBottom="4px">
                        <Flex
                          overflow="hidden"
                          textOverflow="ellipsis"
                          lineHeight="22px"
                          maxH="44px"
                          whiteSpace="normal"
                          width="100%"
                          alignItems="center"
                        >
                          <Box fontSize="18px" fontWeight="500" lineHeight="22px">
                            p/plebbit
                          </Box>
                          <Box fontSize="18px" fontWeight="500" lineHeight="22px" margin="0">
                            ·
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
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
  );
};

export default Home;
