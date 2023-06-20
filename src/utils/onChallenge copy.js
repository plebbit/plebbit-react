
// import getChallengeAnswersFromUser from "./getChallengeAnswersFromUser";
// import logger from "./logger";

// const onChallenge = async (challenges, comment) => {
//     let challengeAnswers = [];

//     try {
//         // ask the user to complete the challenges in a modal window
//         challengeAnswers = await getChallengeAnswersFromUser(challenges, comment);
//     } catch (error) {
//         // if  he declines, throw error and don't get a challenge answer
//         logger('decline challenge', error, 'trace');

//     }
//     if (challengeAnswers) {
//         await comment.publishChallengeAnswers(challengeAnswers);
//     }
// };


// export default onChallenge

import React from "react";
import GetChallengeAnswersFromUser from "./getChallengeAnswersFromUser";
import logger from "./logger";

const onChallenge = async (challenges, comment) => {
    try {
        // Render the component that prompts the user to complete the challenges
        const challengeAnswers = await new Promise((resolve, reject) => {
            const handleComplete = (answers) => {
                resolve(answers);
            };

            const handleDecline = (error) => {
                logger("decline challenge", error, "trace");
                reject(error);
            };

            // Render the component and pass the necessary props
            ReactDOM.render(
                <GetChallengeAnswersFromUser
                    challenges={ challenges }
                    data={ comment }
                    onComplete={ handleComplete }
                    onDecline={ handleDecline }
                />,
                document.getElementById("modal-root")
            );
        });

        // Publish the challenge answers
        await comment.publishChallengeAnswers(challengeAnswers);
    } catch (error) {
        // Handle any errors during the challenge process
        logger("challenge error", error, "error");
    }
};

export default onChallenge;