import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';
import PostCreate from './views/Home/Post/CreatePost';
import PostDetails from './views/Home/Post/PostDetails';
import { useFeed } from '@plebbit/plebbit-react-hooks';

const App = () => {
  const { feed } = useFeed(['memes.eth'], 'new');
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/submit" component={PostCreate} />
            <Route exact path="/postId" component={PostDetails} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
