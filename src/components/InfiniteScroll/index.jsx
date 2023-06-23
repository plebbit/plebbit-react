import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso'
import { ProfileContext } from '../../store/profileContext';

const InfiniteScroll = ({ feeds: feed, loader, hasMore, loadMore, content }) => {


  const { profile } = useContext(ProfileContext);

  const blockedCids = useMemo(() => Object.keys(profile?.blockedCids || {}) || [], [profile?.blockedCids]);
  const [feeds, setFeeds] = useState([...feed])




  useEffect(() => {
    const filterFeeds = (feed) => {
      return feed.filter(item => !blockedCids.includes(item.cid));
    };

    setFeeds(filterFeeds(feed));
  }, [blockedCids]);


  let Loading
  if (hasMore) {
    Loading = () =>
      loader
  }


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
