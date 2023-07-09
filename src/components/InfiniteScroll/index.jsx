import React, { useContext, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso'
import { ProfileContext } from '../../store/profileContext';

const InfiniteScroll = ({ feeds: feed, loader, hasMore, loadMore, content, disableBlocked, enableSubBlock }) => {

  const { profile } = useContext(ProfileContext);

  const blockedCids = useMemo(() => Object.keys(profile?.blockedCids || []), [profile?.blockedCids]);
  const blockedAddress = useMemo(() => Object.keys(profile?.blockedAddresses || []), [profile?.blockedAddresses]);
  const [feeds, setFeeds] = useState([...feed]);

  useMemo(() => {
    const filterCids = (feed) => {
      return feed.filter(item => !blockedCids.includes(item.cid));
    };

    const filteredFeeds = disableBlocked ? feed : filterCids(feed);
    setFeeds(prevFeeds => filteredFeeds);
  }, [blockedCids, disableBlocked, feed]);

  useMemo(() => {
    const filterCids = (feed) => {
      return feed.filter(item => !blockedAddress.includes(item?.subplebbitAddress));
    };

    const filteredFeeds = enableSubBlock ? filterCids(feed) : feed;
    setFeeds(prevFeeds => filteredFeeds);
  }, [blockedAddress, enableSubBlock, feed]);

  const Loading = () => (hasMore ? loader : null);



  return (

    <Virtuoso
      increaseViewportBy={ { bottom: 600, top: 200 } }
      totalCount={ feeds ? feeds.length : 0 }
      data={ feeds }
      style={ { maxWidth: '100%' } }
      itemContent={ (index, feed) => content(index, feed) }
      useWindowScroll={ true }
      components={ {
        Footer: Loading
      } }
      endReached={ loadMore }
    />



  );
};

export default InfiniteScroll;
