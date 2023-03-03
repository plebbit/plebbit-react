import extName from 'ext-name';

const getCommentMediaInfo = (post) => {
  if (!post?.thumbnailUrl && !post?.link) {
    return;
  }
  if (post?.thumbnailUrl) {
    return {
      url: post?.thumbnailUrl,
      type: 'image',
    };
  }
  if (post?.link) {
    const mime = extName(new URL(post?.link).pathname.replace('/', ''))[0]?.mime;
    if (mime?.startsWith('image')) {
      return {
        url: post?.link,
        type: 'image',
      };
    }
    if (mime?.startsWith('video')) {
      return {
        url: post?.link,
        type: 'video',
      };
    }
    if (mime?.startsWith('audio')) {
      return {
        url: post?.link,
        type: 'audio',
      };
    }
  }
};

export default getCommentMediaInfo;
