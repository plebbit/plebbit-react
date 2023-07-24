import { useAccountSubplebbits, useAccounts, useAuthorAvatar, useNotifications, useSubplebbits } from '@plebbit/plebbit-react-hooks'
import { create } from 'zustand'
import useSubPlebbitDefaultData from '../hooks/useSubPlebbitDefaultData'
import { useColorMode } from '@chakra-ui/react'


const version = require('../../package.json')




const useStore = create((set, get) => ({
    profile: useAccount(),
    postStyle: 'card',
    setPostStyle: (val) => set(() => ({ postStyle: val })),
    showSplashcreen: true,
    setShowSplashcreen: (val) => set(() => ({ showSplashcreen: val })),
    feedSort: 'hot',
    setFeedSort: (val) => set(() => ({ feedSort: val })),
    device: 'pc',
    setDevice: (val) => set(() => ({ device: val })),
    accountLists: useAccounts()?.accounts,
    accountSubplebbits: useAccountSubplebbits()?.accountSubplebbits,
    version,
    subscriptions: useSubplebbits({ subplebbitAddresses: defaultAccount?.subscriptions })?.filter((x) => x !== undefined),
    postView: [],
    setPostView: () => { },
    authorAvatarImageUrl: useAuthorAvatar({ author: get()?.profile?.author })?.imageUrl,
    mode: window?.location?.protocol,
    homeAdd: [],
    subPlebbitDefData: [],
    subPlebbitData: useSubPlebbitDefaultData(),
    showSide: false,
    setShowSide: (val) => set(() => ({ showSide: val })),
    baseUrl: get().mode === 'https:' ? 'plebbitapp.eth.limo/#/' : `${window.origin}/#`,
    toggleTheme: () => { },
    notifications: useNotifications({ accountName: get().profile?.name }),
    toggleColorMode: useColorMode()?.toggleColorMode()

}))


export default useStore