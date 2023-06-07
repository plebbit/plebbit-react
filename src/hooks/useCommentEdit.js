import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";
import { usePublishCommentEdit } from "@plebbit/plebbit-react-hooks";
import { useEffect, useState } from "react";

const useCommentEdit = (update, post) => {
    const [options, setOptions] = useState({
        ...update,
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
    });

    const { publishCommentEdit, ...rest } = usePublishCommentEdit(options);

    useEffect(() => {
        setOptions({
            ...update,
            commentCid: post?.cid,
            subplebbitAddress: post?.subplebbitAddress,
            onChallenge,
            onChallengeVerification,
            onError,
        });
    }, [update, post]);

    const commentEdit = async (callBack, failedCallBack) => {
        if (typeof callBack === "function") {
            callBack();
        }
        try {
            await publishCommentEdit();
        } catch (error) {
            logger("edit:comment:response:", error, "error");
            if (typeof failedCallBack === "function") {
                failedCallBack();
            }
        }
    };

    return { commentEdit, ...rest };
};

export default useCommentEdit;