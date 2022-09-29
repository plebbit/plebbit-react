import PlebbitJs from '@plebbit/plebbit-js';
// inject native functions into renderer
// https://github.com/plebbit/plebbit-js/blob/master/docs/cross-platform-native-functions.md
PlebbitJs.setNativeFunctions(window.plebbitJsNativeFunctions);
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
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// set up PWA https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();
