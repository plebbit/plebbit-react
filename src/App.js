import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
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
import PostDetail from './views/PostDetail';
import PostDetailModal from './views/PostDetail/PostDetailModal';
import Author from './views/Author';

const App = () => {
  const location = useLocation();
  const modal = location?.state?.modal;
  const detail = location?.state?.detail;
  const position = location?.state?.location;



  return (
    <div>
      { modal && detail && (
        <Route
          exact
          path={ ['/p/:subplebbitAddress/c/:commentCid', '/profile/c/:index'] }
          component={ PostDetailModal }
        />
      ) }
      <Switch location={ position || location }>
        <Route exact path="/" component={ Home } />
        <Route exact path={ ['/submit', '/p/:subplebbitAddress/submit'] } component={ PostCreate } />
        <Route
          exact
          path={ [
            '/settings',
            '/settings/account',
            '/settings/profile',
            '/settings/plebbit-options',
            '/settings/privacy',
            '/settings/feed',
            '/settings/notifications',
            '/settings/messaging',
          ] }
          component={ Settings }
          name="settings"
        />
        <Route exact path={ ["/profile", '/profile/overview', '/profile/posts', '/profile/comments', '/profile/history', '/profile/saved', "/profile/hidden", "/profile/upvoted", "/profile/downvoted", '/profile/gilded', '/profile/gilded/given'] } component={ Profile } name="Profile" />
        <Route exact path={ ["/u/:authorAddress/c/:commentCid", '/u/:authorAddress/c/:commentCid/overview', '/u/:authorAddress/c/:commentCid/posts', '/u/:authorAddress/c/:commentCid/comments', '/u/:authorAddress/c/:commentCid/gilded'] } component={ Author } name="Author" />
        <Route exact path="/p/:subplebbitAddress" component={ SubPlebbit } />
        <Route
          exact
          path={ ['/p/:subplebbitAddress/c/:commentCid', '/profile/c/:index'] }
          component={ PostDetail }
        />
        <Route exact path="/p/:subplebbitAddress/about/edit" component={ CommunitySettings } />
        <Route exact path="/p/:subplebbitAddress/moderators" component={ Moderators } />
        <Route exact path="/notifications" component={ Notifications } />
        <Route
          exact
          path={ [
            '/p/:subplebbitAddress/about/',
            '/p/:subplebbitAddress/about/moderators',
            '/p/:subplebbitAddress/about/modqueue',
            '/p/:subplebbitAddress/about/spam',
            '/p/:subplebbitAddress/about/ummoderated',
            '/p/:subplebbitAddress/about/muted',
            '/p/:subplebbitAddress/about/approved',
            '/p/:subplebbitAddress/about/flair',
            '/p/:subplebbitAddress/about/emojis',
            '/p/:subplebbitAddress/about/userflair',
            '/p/:subplebbitAddress/about/reports',
            '/p/:subplebbitAddress/about/postflair',
            '/p/:subplebbitAddress/about/rules',
            '/p/:subplebbitAddress/about/settings',
            '/p/:subplebbitAddress/about/styling',
            '/p/:subplebbitAddress/about/removal',
            '/p/:subplebbitAddress/about/scheduledposts',
            '/p/:subplebbitAddress/about/eventposts',
            '/p/:subplebbitAddress/about/chat',
          ] }
          component={ About }
        />
        <Route exact path="*" component={ NotFound } />
      </Switch>
    </div>
  );
};

export default App;
