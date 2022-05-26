import React from 'react';
import ReactDOM from 'react-dom';
import { PlebbitProvider, setPlebbitJs } from '@plebbit/plebbit-react-hooks';
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
    <PlebbitProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </PlebbitProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
