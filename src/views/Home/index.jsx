import React, { useContext } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
// import { useHistory } from 'react-router';
import Post from '../../components/Post/index2';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import subPlebbitsData from '../../components/data/subPlebbits';
import InfiniteScroll from '../../components/InfiniteScroll';

const Home = () => {
  const { isLoggedIn, postStyle, feedSort } = useContext(ProfileContext);
  // const history = useHistory();
  const bg = useColorModeValue('white', 'darkNavBg');
  const { feed, loadMore, hasMore } = useFeed(
    subPlebbitsData?.map((x) => x.value),
    feedSort
  );

  const feeds = feed;

  console.log(feeds);

  return (
    <Flex maxW="100%" padding="20px 24px" justifyContent="center" margin="0 auto">
      <Box
        width={postStyle === 'card' ? '640px' : '100%'}
        sx={{
          '@media (min-width: 960px)': {
            minWidth: '0',
          },
          '@media (max-width: 960px)': {
            width: '100%',
            minWidth: '0',
          },
        }}
      >
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
            content={(feed) => <Post post={feed} key={feed?.cid} mode={postStyle} />}
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
