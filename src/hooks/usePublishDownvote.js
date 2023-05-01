import { useAccountVote, usePublishVote } from "@plebbit/plebbit-react-hooks"
import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";

const usePublishDownvote = (comment) => {
    const accountVote = useAccountVote({ commentCid: comment?.cid })
    const vote = accountVote.vote < 0 ? 0 : -1


    const options = {
        commentCid: comment?.cid,
        subplebbitAddress: comment?.subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
    }

    const usePublishVoteResult = usePublishVote({ ...options, vote })
    return usePublishVoteResult.publishVote
}

export default usePublishDownvote