import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';
import PostDetails from './views/Home/Post/postDetail';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route exact path="/" component={Home} />
            <Route exact path="/postid" component={PostDetails} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
