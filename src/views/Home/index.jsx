import React, { useEffect } from 'react';
import SideBar from './sideBar';
import { useFeed, useSubplebbits } from '@plebbit/plebbit-react-hooks';
import FeedSort from '../../components/Post/FeedSort';
import InfiniteScroll from '../../components/InfiniteScroll';
import Post from '../../components/Post';
import useFeedStateString from '../../hooks/useFeedStateString';
import useStore from '../../store/useStore';
import CreatePostBar from '../../components/CreatePost/createPostBar';
import FeedContent from '../../components/container/FeedContent';
import { useParams } from 'react-router-dom';
import useAppTitle from '../../hooks/useAppTitle';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import useRemoveParamsFromUrl from '../../hooks/useRemoveParamsFromUrl';
import useHomeAllSubAddresses, { useMyHomeSubAddresses } from '../../hooks/useHomeAllSubAddresses';

const Home = () => {
  const { postStyle, device, setStateString } = useStore((state) => state);

  const allSubsAddresses = useHomeAllSubAddresses();
  const mySubsAddresses = useMyHomeSubAddresses();

  const sortType = useParams()?.sortType ?? 'hot';
  const isAll = useRemoveParamsFromUrl() === '/all';
  const subplebbitAddresses = isAll ? allSubsAddresses : mySubsAddresses;

  const { feed, loadMore, hasMore } = useFeed({
    subplebbitAddresses: subplebbitAddresses || undefined,
    sortType: sortType,
  });

  const { subplebbits } = useSubplebbits({
    subplebbitAddresses: subplebbitAddresses,
  });
  const stateString = useFeedStateString(subplebbits);

  useAppTitle({
    label: isAll ? 'p/All' : 'Home',
    icon: isAll && HiOutlineChartSquareBar,
  });

  useEffect(() => {
    setStateString(feed?.length !== 0 ? '' : stateString);

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
            content={(index, post) => (
              <Post index={index} post={post} key={post?.cid || index} mode={postStyle} />
            )}
            feeds={feed}
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
              content={(index, post) => (
                <Post post={post} key={post?.cid || index} index={index} mode={postStyle} />
              )}
              feeds={feed}
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
