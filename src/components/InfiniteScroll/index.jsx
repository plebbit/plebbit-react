import React from 'react';
import Infs from 'react-infinite-scroll-component';

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {
  return (
    <Infs
      dataLength={feeds ? feeds.length : 0}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      // below props only if you need pull down functionality
      refreshFunction={() => {}}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
    >
      {feeds?.map((feed) => content(feed))}
    </Infs>
  );
};

export default InfiniteScroll;
