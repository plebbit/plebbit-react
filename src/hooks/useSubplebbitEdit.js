import { usePublishSubplebbitEdit } from "@plebbit/plebbit-react-hooks"
import onError from "../utils/onError";
import onChallenge from "../utils/onChallenge";
import onChallengeVerification from "../utils/onChallengeVerification";

const useSubplebbitEdit = (subplebbitAddress) => {

    const options = {
        subplebbitAddress,
        onChallenge,
        onChallengeVerification,
        onError,
    }
    const editSubplebbit = async (data, callBack, failedCallBack) => {
        const { publishSubplebbitEdit } = usePublishSubplebbitEdit({ ...data, ...options })
        await publishSubplebbitEdit()
        try {
            setLoading(true);
            await publishSubplebbitEdit();
            if (typeof callBack === 'function') {
                callBack()
            }
        } catch (error) {
            if (typeof failedCallBack === 'function') {
                failedCallBack()
            }
        }
    }



    return editSubplebbit
}

export default useSubplebbitEdit