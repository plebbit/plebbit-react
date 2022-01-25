import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProfileDataProvider } from './store/profileContext';
import Layout from './components/layout';
import Home from './views/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <ProfileDataProvider>
          <Layout>
            <Route path="/" component={Home} />
          </Layout>
        </ProfileDataProvider>
      </Switch>
    </Router>
  );
};

export default App;
