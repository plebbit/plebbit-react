import PlebbitJs from '@plebbit/plebbit-js';
import { ProfileDataProvider } from './store/profileContext';

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

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ProfileDataProvider>
        <App />
      </ProfileDataProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// set up PWA https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();
