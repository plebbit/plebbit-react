import React, { useContext, useEffect } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ProfileContext } from '../../store/profileContext';
import SideBar from './sideBar';
import { useFeed, useSubplebbits } from '@plebbit/plebbit-react-hooks';
import CreatePostBar from '../../components/Post/CreatePost/createPostBar';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import Layout from '../../components/layout';
import useFeedStateString from '../../hooks/useFeedStateString';

const Home = () => {
  const { postStyle, feedSort, device, postView, homeAdd, subPlebbitData, profile } =
    useContext(ProfileContext);
  const bg = useColorModeValue('lightBody', 'darkBody');
  const mainMobileBg = useColorModeValue('white', 'black');

  const { feed, loadMore, hasMore } = useFeed(
    {
      subplebbitAddresses: postView?.length
        ? postView?.filter((x) => x !== null)
        : subPlebbitData?.map((x) => x?.address)?.filter((x) => x !== null),
      sortType: feedSort
    }
  );
  const { subplebbits } = useSubplebbits({
    subplebbitAddresses: postView?.length
      ? postView?.filter((x) => x !== null)
      : subPlebbitData?.map((x) => x?.address)?.filter((x) => x !== null)
  })
  const stateString = useFeedStateString(subplebbits)

  const feeds = feed;






  return (
    <Layout name={ { label: 'Home', value: homeAdd } } stateString={ feeds?.length ? "" : stateString }>
      { device !== 'mobile' ? (
        <Flex
          maxW="100%"
          padding="20px 24px"
          boxSizing="border-box"
          justifyContent="center"
          margin="0 auto"
        >
          <Box width={ postStyle === 'card' ? '640px' : '100%' } minW="0">
            {/* Create Post Bar */ }
            <CreatePostBar />
            {/* feed sorter bar */ }
            <FeedSort />

            <Box minHeight="1000px" width="100%">
              <InfiniteScroll
                hasMore={ hasMore }
                loadMore={ loadMore }
                content={ (index, feed) => <Post index={ index } post={ feed } key={ feed?.cid || index } mode={ postStyle } /> }
                feeds={ feeds }
                loader={ <Post loading={ true } mode={ postStyle } stateString={ stateString } key={ Math.random() } /> }
                enableSubBlock

              />
            </Box>
          </Box>

          <SideBar bg={ bg } width="312px" />
        </Flex>
      ) : (
        <Box bg={ mainMobileBg }>
          <FeedSort />
          <Box bg={ mainMobileBg }>
            <InfiniteScroll
              hasMore={ hasMore }
              loadMore={ loadMore }
              content={ (index, feed) => <Post post={ feed } key={ feed?.cid || index } index={ index } mode={ postStyle } /> }
              feeds={ feeds || [] }
              loader={ <Post loading={ true } mode={ postStyle } key={ Math.random() } /> }
              enableSubBlock

            />
          </Box>
        </Box>
      ) }
    </Layout>
  );
};

export default Home;
