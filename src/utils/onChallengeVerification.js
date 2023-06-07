import logger from "./logger";
import { toast } from 'react-toastify';


const onChallengeVerification = (challengeVerification, comment, onSuccess, onError) => {
    // if the challengeVerification fails, a new challenge request will be sent automatically
    // to break the loop, the user must decline to send a challenge answer
    // if the subplebbit owner sends more than 1 challenge for the same challenge request, subsequents will be ignored
    if (challengeVerification.challengeSuccess === true) {
        if (typeof onSuccess === 'function') {
            onSuccess()
        }

        logger('challenge success', { challengeVerification, comment }, 'trace');
    } else if (challengeVerification.challengeSuccess === false) {
        logger(
            'challenge failed',
            { reason: challengeVerification.reason, errors: challengeVerification.errors, comment },
            'error'
        );
        console.log('error', challengeVerification)
        toast.error(challengeVerification.reason ? challengeVerification.reason : challengeVerification.challengeErrors
            ? (challengeVerification.challengeErrors.join(','))
            : 'Challenge Verification Failed', {
            position: 'bottom-center',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: 'light',
            className: 'toast-message'
        });
        if (typeof onError === 'function') {
            onError()
        }

    }
};


export default onChallengeVerification