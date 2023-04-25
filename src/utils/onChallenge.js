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

export default onChallenge