import React, { useContext } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
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
        <Box>
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
        </Box>
      )}
    </>
  );
};

export default Home;
