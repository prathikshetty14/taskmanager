import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { store } from './redux/store';
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>
);

