import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";
import { usePublishCommentEdit } from "@plebbit/plebbit-react-hooks";
import { useState } from "react";

const useCommentEdit = (post) => {
    const [options, setOptions] = useState({
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
    })

    const { publishCommentEdit } = usePublishCommentEdit(options)


    const commentEdit = async (data, callBack, failedCallBack) => {
        setOptions({ ...data, ...options })
        try {
            await publishCommentEdit();

            if (typeof callBack === 'function') {
                callBack()
            }


        } catch (error) {
            logger('edit:comment:response:', error, 'error');


            if (typeof failedCallBack === 'function') {
                failedCallBack()
            }


        }
    }


    return commentEdit
}

export default useCommentEdit