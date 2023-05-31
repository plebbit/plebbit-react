import React from 'react';
import { Virtuoso } from 'react-virtuoso'

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {



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
