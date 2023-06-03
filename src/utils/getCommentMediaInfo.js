import extName from 'ext-name';

const getCommentMediaInfo = (post) => {
  let mime
  if (!post?.link) {
    return;
  }
  try {
    mime = extName(new URL(post?.link).pathname.replace('/', ''))[0]?.mime;
  } catch (error) {

  }
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
