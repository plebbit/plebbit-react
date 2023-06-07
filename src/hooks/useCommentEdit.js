import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";
import { usePublishCommentEdit } from "@plebbit/plebbit-react-hooks";
import { useEffect, useState } from "react";
import logger from "../utils/logger";

const useCommentEdit = (update, post) => {
    let options = {
        commentCid: post?.cid,
        subplebbitAddress: post?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
        ...update,
    };

    const { publishCommentEdit, ...rest } = usePublishCommentEdit(options);

    useEffect(() => {
        if (Object.keys(update)) {
            options = {
                ...update,
                ...options,
                commentCid: post?.cid,
                subplebbitAddress: post?.subplebbitAddress,
            };
        }
    }, [update]);

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