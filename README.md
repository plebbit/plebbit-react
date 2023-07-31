_Telegram group for this repo https://t.me/plebbitreact_

_Demo https://plebbitapp.netlify.app and https://plebbitapp.eth.limo_

### Development:

For development it is recommened to use the [mock content env variables](https://github.com/plebbit/plebbit-react-hooks/blob/master/docs/mock-content.md#add-env-variable-for-mocking) because the demo subplebbits are slow and often offline.

### Scripts:

- Web client: `yarn start`
- Electron client (must start web client first): `yarn electron`
- Electron client and don't delete data: `yarn electron:no-delete-data`
- Web client and electron client: `yarn electron:start`
- Web client and electron client and don't delete data: `yarn electron:start:no-delete-data`

### Style:

- Use https://chakra-ui.com/ for all components
- Only use hooks and functional components
- Don't use Redux or React context for state management, use zustand https://www.npmjs.com/package/zustand
- Only use styled components or chakra-ui, don't write CSS files

### Pages and components:

The site should use a hash router (localhost:3000/#/page-name). We need to recreate every page that Reddit in this order of priority:

- Feed
- Single post
- Create post
- Profile
- Settings
- Etc.

### URL scheme:

- Post or nested comment page -> plebbit.eth/#/p/:subplebbitAddress/c/:commentCid
- Subplebbit page/feed -> plebbit.eth/#/p/:subplebbitAddress
- Multisub page/feed (like https://www.reddit.com/u/estebanabaroa/m/testmulti) -> plebbit.eth/#/m/:multisubAddress
- Feed with multiple subs (like https://www.reddit.com/r/CryptoCurrency+ethereum) -> plebbit.eth/#/p/:subplebbitAddress1+subplebbitAddress2+etc...
- Own profile page -> plebbit.eth/#/profile
- Settings page (like https://www.reddit.com/settings) -> plebbit.eth/#/settings/:pageName?
- Submit post (like https://www.reddit.com/r/ethereum/submit) -> plebbit.eth/#/p/:subplebbitAddress/submit
- Moderator/about pages (like https://www.reddit.com/r/ethereum/about/modqueue/ https://www.reddit.com/r/ethereum/about/moderators/ https://www.reddit.com/r/ethereum/about/rules/) -> plebbit.eth/#/p/:subplebbitAddress/about/:pageName?
- Author profile page -> plebbit.eth/#/u/:authorAddress/c/:authorCommentCid (not possible to fetch an author without a comment cid)

### Build:

The linux/windows/mac/android build scripts are in https://github.com/plebbit/plebbit-react/blob/master/.github/workflows/release.yml

