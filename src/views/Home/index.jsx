import React, { Profiler } from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import SideBar from './sideBar';
import { useFeed, useSubplebbits } from '@plebbit/plebbit-react-hooks';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import Layout from '../../components/layout';
import useFeedStateString from '../../hooks/useFeedStateString';
import getAddressFromArray from '../../utils/getAddressFromArray';
import useStore from '../../store/useStore';
import CreatePostBar from '../../components/CreatePost/createPostBar';
import FeedContent from '../../components/container/FeedContent';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { postStyle, device, postView, homeAdd, subPlebbitData } = useStore((state) => state);
  const sortType = useParams()?.sortType ?? 'hot';
  const bg = useColorModeValue('lightBody', 'darkBody');
  const subplebbitAddresses = postView?.filter(Boolean)?.length
    ? postView?.filter(Boolean)
    : getAddressFromArray(subPlebbitData);
  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: subplebbitAddresses.length ? subplebbitAddresses : undefined,
    sortType: sortType,
  });

  const { subplebbits } = useSubplebbits({
    subplebbitAddresses: subplebbitAddresses.length ? subplebbitAddresses : undefined,
  });
  const stateString = useFeedStateString(subplebbits);

  const feeds = feed;

  return (
    <Layout name={{ label: 'Home', value: homeAdd }} stateString={feeds?.length ? '' : stateString}>
      <Profiler id="home">
        {device !== 'mobile' ? (
          <>
            <FeedContent
              top={
                <>
                  {/* Create Post Bar */}
                  <CreatePostBar />
                  {/* feed sorter bar */}
                  <FeedSort />
                </>
              }
              type={postStyle === 'card' ? 'true' : 'false'}
              hasMore={hasMore}
              loadMore={loadMore}
              content={(index, feed) => (
                <Post index={index} post={feed} key={feed?.cid || index} mode={postStyle} />
              )}
              feeds={feeds}
              loader={
                <Post
                  loading={true}
                  mode={postStyle}
                  stateString={stateString}
                  key={Math.random()}
                />
              }
              enableSubBlock
              sidebar={<SideBar bg={bg} />}
            />
          </>
        ) : (
          <div>
            <FeedSort />
            <div>
              <InfiniteScroll
                hasMore={hasMore}
                loadMore={loadMore}
                content={(index, feed) => (
                  <Post post={feed} key={feed?.cid || index} index={index} mode={postStyle} />
                )}
                feeds={feeds || []}
                loader={<Post loading={true} mode={postStyle} key={Math.random()} />}
                enableSubBlock
              />
            </div>
          </div>
        )}
      </Profiler>
    </Layout>
  );
};

export default Home;
