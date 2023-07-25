import PlebbitJs from '@plebbit/plebbit-js';
import ProfileDataProvider from './store/profileContext';

// inject native functions into renderer
// https://github.com/plebbit/plebbit-js/blob/master/docs/cross-platform-native-functions.md
if (window.plebbitJsNativeFunctions) {
  PlebbitJs.setNativeFunctions(window.plebbitJsNativeFunctions);
}
// util for manual debugging
window.PlebbitJs = PlebbitJs;

import React from 'react';
import { createRoot } from 'react-dom/client';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './assets/style/theme';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router } from 'react-router-dom';

const app = document.getElementById('root');
const root = createRoot(app);
root.render(<>
  <ChakraProvider theme={ theme }>
    <ProfileDataProvider>
      <Router future={ { v7_startTransition: true } } >
        <App />
      </Router>
    </ProfileDataProvider>
  </ChakraProvider>
  <ToastContainer />
</>)

// set up PWA https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();
