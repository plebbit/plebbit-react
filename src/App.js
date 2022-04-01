import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';
import PostCreate from './views/Home/Post/CreatePost';
import Profile from './views/Profile';
import PostDetails2 from './views/Home/Post/PostDetails/postDetails2';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path={'/submit'} component={PostCreate} />
            <Route exact path="/postId" component={PostDetails2} />
            <Route exact path="/profile" component={Profile} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
