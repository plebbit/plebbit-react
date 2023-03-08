_Telegram group for this repo https://t.me/plebbitreact_

_Demo https://plebbit-dev.netlify.app and https://plebbitdemo.eth.limo_

### Style:

- Use https://chakra-ui.com/ for all components
- Only use hooks and functional components
- Don't use Redux or React context for state management, use zustand https://www.npmjs.com/package/zustand
- Only use styled components or chakra-ui, don't write CSS files

### Data:

We don't have APIs yet for the backend, so please use hardcoded static mock data. It could be in a JSON file or something and passed down to props. Don't create a backend or do HTTP request to fetch the data yet.

Unlike Reddit, Plebbit will be text only, it will not have any videos or images, only links and embeds. Kind of like Reddit back in the day.

### Pages and components:

The site should use a hash router (localhost:3000/#/page-name). We need to recreate every page that Reddit in this order of priority:

- Feed
- Single post
- Create post
- User profile
- User profile settings
- Site settings
- Etc.

### URL scheme

- Post or nested comment page -> plebbit.eth/#/p/:subplebbitAddress/c/:commentCid
- Subplebbit page/feed -> plebbit.eth/#/p/:subplebbitAddress
- Multisub page/feed (like https://www.reddit.com/u/estebanabaroa/m/testmulti) -> plebbit.eth/#/m/:multisubAddress
- Feed with multiple subs (like https://www.reddit.com/r/CryptoCurrency+ethereum) -> plebbit.eth/#/p/:subplebbitAddress1+subplebbitAddress2+etc...
- Own profile page -> plebbit.eth/#/profile
- Settings page (like https://www.reddit.com/settings) -> plebbit.eth/#/settings/:pageName?
- Submit post (like https://www.reddit.com/r/ethereum/submit) -> plebbit.eth/#/p/:subplebbitAddress/submit
- Moderator/about pages (like https://www.reddit.com/r/ethereum/about/modqueue/ https://www.reddit.com/r/ethereum/about/moderators/ https://www.reddit.com/r/ethereum/about/rules/) -> plebbit.eth/#/p/:subplebbitAddress/about/:pageName?
- (not supported yet) Author profile page -> plebbit.eth/#/u/authorAddress
