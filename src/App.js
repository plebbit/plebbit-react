import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile/index2';
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
import CreatePost from './views/CreatePost';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hot" element={<Home />} />
      <Route path="/new" element={<Home />} />
      <Route path="/top" element={<Home />} />
      <Route path="/submit" element={<CreatePost />} />
      <Route path="/p/:subplebbitAddress/submit" element={<CreatePost />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/account" element={<Settings />} />
      <Route path="/settings/profile" element={<Settings />} />
      <Route path="/settings/plebbit-options" element={<Settings />} />
      <Route path="/settings/plebbit-privacy" element={<Settings />} />
      <Route path="/settings/feed" element={<Settings />} />
      <Route path="/settings/notifications" element={<Settings />} />
      <Route path="/settings/messaging" element={<Settings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/overview" element={<Profile />} />
      <Route path="/profile/posts" element={<Profile />} />
      <Route path="/profile/comments" element={<Profile />} />
      <Route path="/profile/history" element={<Profile />} />
      <Route path="/profile/saved" element={<Profile />} />
      <Route path="/profile/hidden" element={<Profile />} />
      <Route path="/profile/upvoted" element={<Profile />} />
      <Route path="/profile/downvoted" element={<Profile />} />
      <Route path="/profile/gilded" element={<Profile />} />
      <Route path="/profile/gilded/given" element={<Profile />} />
      <Route path="/u/:authorAddress/c/:commentCid" element={<Author />} />
      <Route path="/u/:authorAddress/c/:commentCid/overview" element={<Author />} />
      <Route path="/u/:authorAddress/c/:commentCid/posts" element={<Author />} />
      <Route path="/u/:authorAddress/c/:commentCid/gilded" element={<Author />} />
      <Route path="/p/:subplebbitAddress" element={<SubPlebbit />} />
      <Route path="/p/:subplebbitAddress/hot" element={<SubPlebbit />} />
      <Route path="/p/:subplebbitAddress/new" element={<SubPlebbit />} />
      <Route path="/p/:subplebbitAddress/top" element={<SubPlebbit />} />
      <Route path="/p/:subplebbitAddress/c/:commentCid" element={<PostDetail />} />
      <Route path="/profile/c/:index" element={<PostDetail />} />
      <Route path="/p/:subplebbitAddress/about/edit" element={<CommunitySettings />} />
      <Route path="/p/:subplebbitAddress/moderators" element={<Moderators />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="/p/:subplebbitAddress/about" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/moderators" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/modqueue" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/spam" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/ummoderated" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/muted" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/approved" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/flair" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/emojis" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/userflair" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/reports" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/postflair" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/rules" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/settings" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/styling" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/removal" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/scheduledposts" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/eventposts" element={<About />} />
      <Route path="/p/:subplebbitAddress/about/chat" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
