import React from 'react';
import ReactDOM from 'react-dom';
import App from './router';
import 'antd/dist/antd.css';
import './index.scss';
import 'lib-flexible';
// import 'reset-css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
