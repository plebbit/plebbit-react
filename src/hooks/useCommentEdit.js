import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";
import { usePublishCommentEdit } from "@plebbit/plebbit-react-hooks";

const useCommentEdit = (post) => {
    const options = {
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
    }

    const commentEdit = async (data, callBack, failedCallBack) => {
        const { publishCommentEdit } = usePublishCommentEdit({ ...data, ...options })

        try {
            await publishCommentEdit();
            if (typeof callBack === 'function') {
                callBack()
            }


        } catch (error) {
            logger('edit:comment:response:', error, 'error');
            toast({
                title: 'Comment Edit Declined.',
                description: error?.stack.toString(),
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            if (typeof failedCallBack === 'function') {
                failedCallBack()
            }


        }
    }


    return commentEdit
}

export default useCommentEdit