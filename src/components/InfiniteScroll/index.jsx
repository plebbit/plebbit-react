import React from 'react';
import Infs from 'react-infinite-scroll-component';
import { Virtuoso } from 'react-virtuoso'
import logger from '../../utils/logger';

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {



  let Loading
  if (hasMore) {
    Loading = () => loader
  }
  return (
    // <Infs
    //   dataLength={feeds ? feeds.length : 0}
    //   next={() => {
    //     try {
    //       loadMore();
    //     } catch (error) {
    //       logger('load-more', error, 'trace');
    //     }
    //   }}
    //   hasMore={hasMore}
    //   loader={loader}
    //   // below props only if you need pull down functionality
    //   refreshFunction={() => {}}
    //   // pullDownToRefresh
    //   pullDownToRefreshThreshold={50}
    //   pullDownToRefreshContent={
    //     <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
    //   }
    //   releaseToRefreshContent={<h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>}
    // >
    //   {feeds?.map((feed) => content(feed))}
    // </Infs>
    <Virtuoso
      increaseViewportBy={{bottom: 600, top: 200}}
      totalCount={ feeds ? feeds.length : 0 }
      data={ feeds }
      style={ { height: '100%', maxWidth: '100%' } }
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
