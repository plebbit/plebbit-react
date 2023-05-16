import { useMemo } from "react"

const useStateString = (commentOrSubplebbit) => {
    return useMemo(() => {
        if (!commentOrSubplebbit?.clients) {
            return
        }
        const clients = commentOrSubplebbit?.clients

        const states = {}
        for (const clientType in clients) {
            for (const clientUrl in clients[clientType]) {
                const state = clients[clientType][clientUrl].state
                if (state === 'stopped') {
                    continue
                }
                if (!states[state]) {
                    states[state] = []
                }
                states[state].push(clientUrl)
            }
        }

        const getClientHost = (clientUrl) => {
            try {
                return new URL(clientUrl).hostname || clientUrl
            }
            catch (e) {
                return clientUrl
            }
        }

        let stateString = ''
        for (const state in states) {
            const clientUrls = states[state]
            const clientHosts = clientUrls.map(clientUrl => getClientHost(clientUrl))

            // if there are no valid hosts, skip this state
            if (clientHosts.length === 0) {
                continue
            }

            // separate 2 different states using ', '
            if (stateString) {
                stateString += ', '
            }

            // e.g. 'fetching IPFS from cloudflare-ipfs.com, ipfs.io'
            const formattedState = state.replaceAll('-', ' ').replace('ipfs', 'IPFS').replace('ipns', 'IPNS')
            stateString += `${formattedState} from ${clientHosts.join(', ')}`
        }

        // fallback to comment or subplebbit state when possible
        if (!stateString) {
            if (commentOrSubplebbit?.publishingState !== 'stopped') {
                stateString = commentOrSubplebbit.publishingState
            }
            else if (commentOrSubplebbit?.updatingState !== 'stopped') {
                stateString = commentOrSubplebbit.updatingState
            }
            if (stateString) {
                stateString = stateString.replaceAll('-', ' ').replace('ipfs', 'IPFS').replace('ipns', 'IPNS')
            }
        }

        // capitalize first letter
        if (stateString) {
            stateString = stateString.charAt(0).toUpperCase() + stateString.slice(1)
        }

        // if string is empty, return undefined instead
        return stateString === '' ? undefined : stateString
    }, [commentOrSubplebbit])
}

export default useStateString