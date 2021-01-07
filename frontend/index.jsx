import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './common/app/configureStore';
import 'modern-css-reset/dist/reset.min.css';
import './index.scss';
import App from './app/App';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app')
);
