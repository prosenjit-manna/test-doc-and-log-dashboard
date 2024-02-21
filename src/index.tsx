import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@mantine/core/styles.css';
import './index.scss';

import { store } from './Lib/Store/Store';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorTracking from './Components/ErrorTracking';
import ErrorBoundary from 'Components/RouterErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <ErrorTracking />
        <App />
      </BrowserRouter>
    </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


