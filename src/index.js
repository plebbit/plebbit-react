import React from 'react';
import ReactDOM from 'react-dom';
import { PlebbitProvider } from '@plebbit/plebbit-react-hooks';
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
