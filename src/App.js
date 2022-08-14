import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Home from './views/Home';
import PostCreate from './components/Post/CreatePost';
import Profile from './views/Profile';
import PostDetails from './components/Post/PostDetails';
import SubPlebbit from './views/SubPlebbit';
import Settings from './views/Settings';
import About from './views/About';
import CommunitySettings from './views/Community';
import Moderators from './views/About/Moderator';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Route exact path="/" component={Home} />
          <Route exact path={['/submit', '/p/:subplebbitAddress/submit']} component={PostCreate} />
          <Route exact path="/settings" component={Settings} name="settings" />
          <Route exact path="/profile" component={Profile} name="Profile" />
          <Route exact path="/p/:subplebbitAddress" component={SubPlebbit} />
          <Route exact path="/p/:subplebbitAddress/c/:commentCid" component={PostDetails} />
          <Route exact path="/p/:subplebbitAddress/about/edit" component={CommunitySettings} />
          <Route exact path="/p/:subplebbitAddress/moderators" component={Moderators} />
          <Route
            exact
            path={[
              '/p/:subplebbitAddress/about/',
              '/p/:subplebbitAddress/about/moderators',
              '/p/:subplebbitAddress/about/modqueue',
              '/p/:subplebbitAddress/about/spam',
              '/p/:subplebbitAddress/about/edited',
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
              '/p/:subplebbitAddress/about/removal',
              '/p/:subplebbitAddress/about/scheduledposts',
              '/p/:subplebbitAddress/about/eventposts',
              '/p/:subplebbitAddress/about/chat',
            ]}
            component={About}
          />
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
