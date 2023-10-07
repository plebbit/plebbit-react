import { create } from 'zustand';

const { version } = require('../../package.json');

const useStore = create((set, get) => ({
  postStyle: 'card',
  setPostStyle: (val) => set(() => ({ postStyle: val })),
  showSplashcreen: true,
  setShowSplashcreen: (val) => set(() => ({ showSplashcreen: val })),
  device: 'pc',
  setDevice: (val) => set(() => ({ device: val })),
  version,
  postView: [],
  setPostView: (val) => set(() => ({ postView: val })),
  isElectron: window?.location?.protocol,
  homeAdd: [],
  setHomeAdd: (val) => set(() => ({ homeAdd: val })),
  subPlebbitDefData: [],
  setSubPlebbitDefData: (val) => set(() => ({ subPlebbitDefData: val })),
  subPlebbitData: [],
  setSubPlebbitData: (val) => set(() => ({ subPlebbitData: val })),
  showSide: false,
  setShowSide: (val) => set(() => ({ showSide: val })),
  baseUrl: get()?.mode === 'https:' ? 'plebbitapp.eth.limo/#/' : `${window.origin}/#`,
  navLocation: {},
  setNavLocation: (val) => set(() => ({ location: val })),
  showImportAccountModal: false,
  setShowImportAccountModal: (val) => set(() => ({ showImportAccountModal: val })),
  showCreateSubModal: false,
  setShowCreateSubModal: (val) => set(() => ({ showCreateSubModal: val })),
}));

export default useStore;
