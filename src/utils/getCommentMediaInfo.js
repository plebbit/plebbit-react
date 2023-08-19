import extName from 'ext-name';
import memoize from 'memoizee'

const getCommentLinkMediaTypeNoCache = (post) => {
  let mime
  if (!post?.link) {
    return;
  }
  try {
    mime = extName(new URL(post?.link).pathname.toLowerCase().replace('/', ''))[0]?.mime;
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

const getCommentMediaInfo = memoize(getCommentLinkMediaTypeNoCache, { max: 1000 })

export default getCommentMediaInfo;
