
import getChallengeAnswersFromUser from "./getChallengeAnswersFromUser";
import logger from "./logger";
import { toast } from 'react-toastify';

const onChallenge = async (challenges, comment) => {
    let challengeAnswers = [];

    try {
        // ask the user to complete the challenges in a modal window
        challengeAnswers = await getChallengeAnswersFromUser(challenges);
    } catch (error) {
        // if  he declines, throw error and don't get a challenge answer
        logger('decline challenge', error, 'trace');

    }
    if (challengeAnswers) {
        await comment.publishChallengeAnswers(challengeAnswers);
    }
};


export default onChallenge