import { useAccountVote, usePublishVote } from "@plebbit/plebbit-react-hooks"
import getChallengeAnswersFromUser from "../utils/getChallengeAnswersFromUser";
import onError from "../utils/onError";
import { useToast } from "@chakra-ui/react";

const usePublishUpvote = (comment) => {
    const toast = useToast();
    const accountVote = useAccountVote({ commentCid: comment?.cid })
    const vote = accountVote?.vote > 0 ? 0 : 1

    const onChallenge = async (challenges, comment) => {
        let challengeAnswers = [];

        try {
            // ask the user to complete the challenges in a modal window

            challengeAnswers = await getChallengeAnswersFromUser(challenges);
        } catch (error) {
            // if  he declines, throw error and don't get a challenge answer
            logger('decline challenge', error, 'trace');
            toast({
                title: 'Declined.',
                description: error?.stack.toString() || 'failed Challenge',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        if (challengeAnswers) {
            await comment.publishChallengeAnswers(challengeAnswers);
        }
    };
    const onChallengeVerification = (challengeVerification) => {
        if (challengeVerification.challengeSuccess === true) {

            logger('challenge success', { challengeVerification }, 'trace');
        } else if (challengeVerification.challengeSuccess === false) {
            logger(
                'challenge failed',
                {
                    reason: challengeVerification.reason,
                    errors: challengeVerification.challengeErrors,
                },
                'error'
            );
            toast({
                title: challengeVerification.reason ? challengeVerification.reason : 'Declined.',
                description: challengeVerification.challengeErrors
                    ? challengeVerification.challengeErrors.join(',')
                    : 'Challenge Verification Failed',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };


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

export default usePublishUpvote