import extName from 'ext-name';

const getCommentMediaInfo = (post) => {
  if (!post?.link) {
    return;
  }
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

};

export default getCommentMediaInfo;
