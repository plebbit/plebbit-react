import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Profile from './views/Profile';
import SubPlebbit from './views/SubPlebbit';
import Settings from './views/Settings';
import About from './views/About';
import Moderators from './views/About/Moderator';
import NotFound from './views/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import Notifications from './views/Notifications';
import PostDetail from './views/PostDetail';
import Author from './views/Author';
import CreatePost from './views/CreatePost';
import Layout from './components/layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:sortType" element={<Home />} />
        <Route path="/submit" element={<CreatePost />} />
        <Route path="/p/:subplebbitAddress/submit" element={<CreatePost />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/:view" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:view" element={<Profile />} />
        <Route path="/u/:authorAddress/c/:commentCid" element={<Author />} />
        <Route path="/u/:authorAddress/c/:commentCid/:view" element={<Author />} />
        <Route path="/p/:subplebbitAddress" element={<SubPlebbit />} />
        <Route path="/p/:subplebbitAddress/:sortType" element={<SubPlebbit />} />
        <Route path="/p/:subplebbitAddress/?styling=true" element={<SubPlebbit />} />
        <Route path="/p/:subplebbitAddress/c/:commentCid" element={<PostDetail />} />
        <Route path="/profile/c/:index" element={<PostDetail />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="/p/:subplebbitAddress/about" element={<About />} />
        {/* <Route path="/p/:subplebbitAddress/about/edit" element={<CommunitySettings />} /> */}
        <Route path="/p/:subplebbitAddress/moderators" element={<Moderators />} />
        <Route path="/p/:subplebbitAddress/about/:page" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
