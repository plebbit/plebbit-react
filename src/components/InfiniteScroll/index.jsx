import { Box, useToast } from '@chakra-ui/react';
import React from 'react';
import Infs from 'react-infinite-scroll-component';

const InfiniteScroll = ({ feeds, loader, hasMore, loadMore, content }) => {
  const toast = useToast();
  return (
    <>
      <Infs
        dataLength={feeds ? feeds.length : 0}
        next={() => {
          try {
            loadMore();
          } catch (error) {
            toast({
              title: 'Load more Error.',
              description: error?.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }}
        hasMore={hasMore}
        loader={loader}
        // below props only if you need pull down functionality
        refreshFunction={() => {}}
        // pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {feeds?.length ? (
          feeds?.map((feed) => content(feed))
        ) : (
          <Box textAlign="center" padding="20px">
            No feeds available
          </Box>
        )}
      </Infs>
    </>
  );
};

export default InfiniteScroll;
