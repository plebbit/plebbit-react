import React from 'react';
import { useRoutes } from 'react-router-dom';
import Home from './views/Home';
import PostCreate from './components/Post/CreatePost';
import Profile from './views/Profile';
import SubPlebbit from './views/SubPlebbit';
import Settings from './views/Settings';
import About from './views/About';
import CommunitySettings from './views/Community';
import Moderators from './views/About/Moderator';
import NotFound from './views/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import Notifications from './views/Notifications';
import PostDetail from './views/PostDetail/postDetail2';
import Author from './views/Author';

const App = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/hot',
      element: <Home />,
    },
    {
      path: '/new',
      element: <Home />,
    },
    {
      path: '/top',
      element: <Home />,
    },
    {
      path: '/submit',
      element: <PostCreate />,
    },
    {
      path: '/p/:subplebbitAddress/submit',
      element: <PostCreate />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/account',
      element: <Settings />,
    },
    {
      path: '/settings/profile',
      element: <Settings />,
    },
    {
      path: '/settings/plebbit-options',
      element: <Settings />,
    },
    {
      path: '/settings/privacy',
      element: <Settings />,
    },
    {
      path: '/settings/feed',
      element: <Settings />,
    },
    {
      path: '/settings/notifications',
      element: <Settings />,
    },
    {
      path: '/settings/messaging',
      element: <Settings />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '/profile/overview',
      element: <Profile />,
    },
    {
      path: '/profile/posts',
      element: <Profile />,
    },
    {
      path: '/profile/comments',
      element: <Profile />,
    },
    {
      path: '/profile/history',
      element: <Profile />,
    },
    {
      path: '/profile/saved',
      element: <Profile />,
    },
    {
      path: '/profile/hidden',
      element: <Profile />,
    },
    {
      path: '/profile/upvoted',
      element: <Profile />,
    },
    {
      path: '/profile/downvoted',
      element: <Profile />,
    },
    {
      path: '/profile/gilded',
      element: <Profile />,
    },
    {
      path: '/profile/gilded/given',
      element: <Profile />,
    },
    {
      path: '/u/:authorAddress/c/:commentCid',
      element: <Author />,
    },
    {
      path: '/u/:authorAddress/c/:commentCid/overview',
      element: <Author />,
    },
    {
      path: '/u/:authorAddress/c/:commentCid/posts',
      element: <Author />,
    },
    {
      path: '/u/:authorAddress/c/:commentCid/comments',
      element: <Author />,
    },
    {
      path: '/u/:authorAddress/c/:commentCid/gilded',
      element: <Author />,
    },
    {
      path: '/p/:subplebbitAddress',
      element: <SubPlebbit />,
    },
    {
      path: '/p/:subplebbitAddress/hot',
      element: <SubPlebbit />,
    },
    {
      path: '/p/:subplebbitAddress/new',
      element: <SubPlebbit />,
    },
    {
      path: '/p/:subplebbitAddress/top',
      element: <SubPlebbit />,
    },
    {
      path: '/p/:subplebbitAddress/c/:commentCid',
      element: <PostDetail />,
    },
    {
      path: '/profile/c/:index',
      element: <PostDetail />,
    },
    {
      path: '/p/:subplebbitAddress/about/edit',
      element: <CommunitySettings />,
    },
    {
      path: '/p/:subplebbitAddress/moderators',
      element: <Moderators />,
    },
    {
      path: 'notifications',
      element: <Notifications />,
    },
    {
      path: '/p/:subplebbitAddress/about/',
      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/moderators',
      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/modqueue',
      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/spam',
      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/ummoderated',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/muted',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/approved',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/flair',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/emojis',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/userflair',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/reports',
      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/postflair',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/rules',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/settings',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/styling',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/removal',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/scheduledposts',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/eventposts',

      element: <About />,
    },
    {
      path: '/p/:subplebbitAddress/about/chat',

      element: <About />,
    },

    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return routes;
};

export default App;
