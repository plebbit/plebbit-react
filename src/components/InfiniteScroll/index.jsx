import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

const lastVirtuosoStates = {};

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {
  const params = useParams();
  const Loading = () => (hasMore ? loader : null);
  const sortType = params?.sortType || 'hot';

  // save last virtuoso state on each scroll
  const virtuosoRef = useRef();
  useEffect(() => {
    const setLastVirtuosoState = () =>
      virtuosoRef?.current?.getState((snapshot) => {
        // TODO: not sure if checking for empty snapshot.ranges works for all scenarios
        if (snapshot?.ranges?.length) {
          lastVirtuosoStates[sortType] = snapshot;
        }
      });
    window.addEventListener('scroll', setLastVirtuosoState);
    // clean listener on unmount
    return () => window.removeEventListener('scroll', setLastVirtuosoState);
  }, [sortType]);
  const lastVirtuosoState = lastVirtuosoStates?.[sortType];
  return (
    <>
      <Virtuoso
        // increaseViewportBy={{ bottom: 600, top: 200 }}
        totalCount={feeds ? feeds.length : 0}
        data={feeds}
        style={{ maxWidth: '100%' }}
        itemContent={(index, feed) => content(index, feed)}
        useWindowScroll={true}
        components={{
          Footer: Loading,
        }}
        endReached={loadMore}
        ref={virtuosoRef}
        restoreStateFrom={lastVirtuosoState}
        initialScrollTop={lastVirtuosoState?.scrollTop}
      />
    </>
  );
};

export default InfiniteScroll;
