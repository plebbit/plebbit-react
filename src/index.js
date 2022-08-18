import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { setPlebbitJs } from '@plebbit/plebbit-react-hooks';
// add PlebbitJs to window.PlebbitJs so that the hooks
// can call setPlebbitJs(PlebbitJs) and use Plebbit with
// all node privileges
if (window.PlebbitJs) {
  setPlebbitJs(window.PlebbitJs);
}
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
