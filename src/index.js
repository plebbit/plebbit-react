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
import { App as CapacitorApp } from '@capacitor/app';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './assets/style/theme';
import { ToastContainer } from 'react-toastify';
import { HashRouter as Router } from 'react-router-dom';

const app = document.getElementById('root');
const root = createRoot(app);
root.render(
  <>
    <ProfileDataProvider>
      <Router future={{ v7_startTransition: true }}>
        <App />
      </Router>
    </ProfileDataProvider>
    <ToastContainer position="bottom-center" autoClose={false} closeButton hideProgressBar />
  </>
);

// set up PWA https://cra.link/PWA
serviceWorkerRegistration.register();

reportWebVitals();

// add back button in android app
CapacitorApp.addListener('backButton', ({ canGoBack }) => {
  if (canGoBack) {
    window.history.back();
  } else {
    CapacitorApp.exitApp();
  }
});
