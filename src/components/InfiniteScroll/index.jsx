import React, { useMemo, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useAccount } from '@plebbit/plebbit-react-hooks';

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {
  const profile = useAccount();

  const Loading = () => (hasMore ? loader : null);

  return (
    <Virtuoso
      increaseViewportBy={{ bottom: 600, top: 200 }}
      totalCount={feeds ? feeds.length : 0}
      data={feeds}
      style={{ maxWidth: '100%' }}
      itemContent={(index, feed) => content(index, feed)}
      useWindowScroll={true}
      components={{
        Footer: Loading,
      }}
      endReached={loadMore}
    />
  );
};

export default InfiniteScroll;
