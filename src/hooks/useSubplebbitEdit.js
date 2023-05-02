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
    const publish = async (data) => {
        const { publishSubplebbitEdit } = usePublishSubplebbitEdit({ ...data, ...options })
        await publishSubplebbitEdit()
    }



    return publish
}

export default useSubplebbitEdit