import PlebbitJs from '@plebbit/plebbit-js';
import { ProfileDataProvider } from './store/profileContext';
import { ToastContainer } from 'react-toastify';

// inject native functions into renderer
// https://github.com/plebbit/plebbit-js/blob/master/docs/cross-platform-native-functions.md
if (window.plebbitJsNativeFunctions) {
  PlebbitJs.setNativeFunctions(window.plebbitJsNativeFunctions);
}
// util for manual debugging
window.PlebbitJs = PlebbitJs;

import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './assets/style/theme';
import { HashRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ProfileDataProvider>
        <Router>
          <App />
        </Router>
      </ProfileDataProvider>
    </ChakraProvider>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

// set up PWA https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();
