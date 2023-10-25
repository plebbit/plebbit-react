import onError from '../utils/onError';
import onChallenge from '../utils/onChallenge';
import onChallengeVerification from '../utils/onChallengeVerification';
import { usePublishComment as usePublish } from '@plebbit/plebbit-react-hooks';
import logger from '../utils/logger';

const usePublishComment = (content, post) => {
  const options = {
    parentCid: post?.cid, // if top level reply to a post, same as postCid
    subplebbitAddress: post?.subplebbitAddress,
    onChallenge,
    onChallengeVerification,
    onError,
  };
  const { publishComment: publish, ...rest } = usePublish({ ...options, content });

  const publishComment = async (callBack, failedCallBack) => {
    if (typeof callBack === 'function') {
      callBack();
    }
    try {
      await publish();
    } catch (error) {
      logger('post:comment:response:', error, 'error');
      ``;
      if (typeof failedCallBack === 'function') {
        failedCallBack();
      }
    }
  };

  return { publishComment, rest };
};

export default usePublishComment;
