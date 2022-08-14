import React, { useContext } from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import Layout from '../../components/layout';

const Home = () => {
  const { isLoggedIn, postStyle, feedSort, device, postView, subscriptions } =
    useContext(ProfileContext);
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mobileMainColor = useColorModeValue('lightMobileText', 'darkMobileText');
  const mainMobileBg = useColorModeValue('white', 'black');

  const { feed, loadMore, hasMore } = useFeed(postView, feedSort);
  const feeds = feed;
  console.log('post-view', postView);
  return (
    <Layout name={{ label: 'Home', value: subscriptions?.map((x) => x?.address) }}>
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
                content={(feed) => <Post post={feed} key={Math.random()} mode={postStyle} />}
                feeds={feeds}
                loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
              />
            </Box>
          </Box>

          <SideBar bg={bg} />
        </Flex>
      ) : (
        <Box bg={mainMobileBg}>
          {!isLoggedIn && (
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
          )}
          <FeedSort />
          <Box bg={mainMobileBg}>
            <InfiniteScroll
              hasMore={hasMore}
              loadMore={loadMore}
              content={(feed) => <Post post={feed} key={Math.random()} mode={postStyle} />}
              feeds={feeds || []}
              loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
            />
          </Box>
        </Box>
      )}
    </Layout>
  );
};

export default Home;
