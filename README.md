*Telegram group for this repo https://t.me/plebbitreact*

*Demo https://plebbit-dev.netlify.app/#/*

### Style:

- Use https://chakra-ui.com/ for all components
- Only use hooks and functional components
- Don't use Redux or state management librairies, use React context https://reactjs.org/docs/context.html
- Only use styled components using chakra-ui, don't write CSS files

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
