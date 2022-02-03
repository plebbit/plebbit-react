import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';
import PostDetails from './views/Home/Post/postDetail';
import PostCreate from './views/Home/Post/createPost';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/postid" component={PostDetails} />
            <Route exact path="/submit" component={PostCreate} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
