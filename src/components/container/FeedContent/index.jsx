import React from 'react';
import styles from './feedcontent.module.css';
import InfiniteScroll from '../../InfiniteScroll';

const FeedContent = ({
  feeds,
  loader,
  hasMore,
  loadMore,
  content,
  disableBlocked,
  enableSubBlock,
  top,
  type,
  sidebar,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      {/* FeedContent */}
      <div className={styles.wrapper2} type={type}>
        {top}
        <div className={styles.home_feed}>
          {children || (
            <InfiniteScroll
              hasMore={hasMore}
              loadMore={loadMore}
              content={(index, feed) => content(index, feed)}
              feeds={feeds || []}
              loader={loader}
              enableSubBlock={enableSubBlock}
              disableBlocked={disableBlocked}
            />
          )}
        </div>
      </div>
      {/* sideBar */}
      <div className={styles.sidebar}>{sidebar}</div>
    </div>
  );
};

export default FeedContent;

export const SideBarWrap = ({ children, className }) => {
  return <div className={[styles.sidebar_wrap, className].join(' ')}>{children}</div>;
};
