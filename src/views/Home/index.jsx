import React, { useEffect } from 'react';
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
import useAppTitle from '../../hooks/useAppTitle';
import removeParamsFromUrl from '../../utils/removeParamsFromUrl';
import { HiOutlineChartSquareBar } from 'react-icons/hi';

const Home = () => {
  const { postStyle, device, homeAdd, setStateString, mySubsAddresses, allSubsAddresses } =
    useStore((state) => state);
  const sortType = useParams()?.sortType ?? 'hot';
  const subplebbitAddresses =
    removeParamsFromUrl() === '/all'
      ? allSubsAddresses
      : mySubsAddresses?.length === 0
      ? allSubsAddresses
      : mySubsAddresses;
  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: subplebbitAddresses.length ? subplebbitAddresses : undefined,
    sortType: sortType,
  });

  const { subplebbits } = useSubplebbits({
    subplebbitAddresses: subplebbitAddresses.length ? subplebbitAddresses : undefined,
  });
  const stateString = useFeedStateString(subplebbits);

  const feeds = feed;
  useAppTitle({
    label: removeParamsFromUrl() === '/all' ? 'p/All' : 'Home',
    value: homeAdd,
    icon: removeParamsFromUrl() === '/all' && HiOutlineChartSquareBar,
  });

  useEffect(() => {
    setStateString(feeds?.length !== 0 ? '' : stateString);

    return () => {
      setStateString('');
    };
  }, [stateString]);

  return (
    <>
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
              <Post loading={true} mode={postStyle} stateString={stateString} key={Math.random()} />
            }
            enableSubBlock
            sidebar={<SideBar />}
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
    </>
  );
};

export default Home;
