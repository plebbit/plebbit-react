import React from 'react';
import getCommentMediaInfo from '../../utils/getCommentMediaInfo';
import Image from '../Image';
import ReactPlayer from 'react-player/lazy';
import useStore from '../../store/useStore';
import Embed, { canEmbed } from '../Embed';
import styles from './post.module.css';

const PostMedia = ({ post, detail }) => {
  const mediaInfo = getCommentMediaInfo(post);
  const { postStyle } = useStore((state) => state);

  const showPlaceholder = postStyle !== 'card';

  if (!post?.content && !post?.removed) {
    try {
      const parsedUrl = new URL(post?.link);
      if (canEmbed(parsedUrl)) {
        return (
          detail && (
            <div className={styles.mediaWrapper}>
              <Embed parsedUrl={parsedUrl} />
            </div>
          )
        );
      }
    } catch (e) {}
    {
      if (mediaInfo?.type === 'image') {
        return (
          <div className={styles.mediaWrapper}>
            <Image
              style={{
                height: '100%',
                margin: '0px auto',
                width: '100%',
                overflow: 'hidden',
                background: '#fff',
              }}
              src={post?.link}
              onError={(event) => {
                event.target.hidden = true;
              }}
              noPlaceholder={!showPlaceholder}
            />
          </div>
        );
      } else if (mediaInfo?.type === 'video') {
        return (
          <div
            style={{
              width: '100%',
              height: '320px',
              color: '#fff',
              cursor: 'default',
              flex: '1',
            }}
          >
            <ReactPlayer
              onError={(event) => {
                event.target.hidden = true;
              }}
              preload="auto"
              playsInline
              url={post?.link}
              width="100%"
              height="320px"
              controls={false}
            />
          </div>
        );
      } else if (mediaInfo?.type === 'audio') {
        return (
          <div
            style={{
              maxWidth: '100%',
              color: '#fff',
              margin: '0px 8px',
            }}
          >
            <audio
              preload="auto"
              src={post?.link}
              onError={(event) => {
                event.target.hidden = true;
              }}
              controls
              style={{
                width: '100%',
              }}
            >
              <source src={post?.link} />
            </audio>
          </div>
        );
      }
    }
  }
  return null;
};

export default React.memo(PostMedia);
