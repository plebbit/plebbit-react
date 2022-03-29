import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';
import PostCreate from './views/Home/Post/CreatePost';
import PostDetails from './views/Home/Post/PostDetails';
import Profile from './views/Profile';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/submit" component={PostCreate} />
            <Route exact path="/postId" component={PostDetails} />
            <Route exact path="/user/abydin" component={Profile} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
