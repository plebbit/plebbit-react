import React, { useContext } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import Layout from '../../components/layout';

const Home = () => {
  const { postStyle, feedSort, device, postView, homeAdd, subPlebbitData } =
    useContext(ProfileContext);
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainMobileBg = useColorModeValue('white', 'black');

  const { feed, loadMore, hasMore } = useFeed(
    postView?.length ? postView : subPlebbitData?.map((x) => x?.address),
    feedSort
  );
  const feeds = feed;

  return (
    <Layout name={{ label: 'Home', value: homeAdd }}>
      {device !== 'mobile' ? (
        <Flex
          maxW="100%"
          padding="20px 24px"
          boxSizing="border-box"
          justifyContent="center"
          margin="0 auto"
        >
          <Box width={postStyle === 'card' ? '640px' : '100%'} minW="0">
            {/* Create Post Bar */}
            <CreatePostBar />
            {/* feed sorter bar */}
            <FeedSort />

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
