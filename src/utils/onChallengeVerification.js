


const onChallengeVerification = (challengeVerification, onSuccess, onError) => {
    if (challengeVerification.challengeSuccess === true) {
        toast({
            title: 'Accepted.',
            description: 'Action accepted',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
        onSuccess()
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
        onError()
    }
};


export default onChallengeVerification