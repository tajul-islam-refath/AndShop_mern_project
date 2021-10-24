import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from "jwt-decode";
import './index.css';
import App from './App';

import { LOAD_USER_SUCCESS } from './store/Types/userTypes'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import { Provider } from 'react-redux'
import store from './store/store'

// optional configuration
const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  // offset: '30px',
  transition: transitions.SCALE
}

// User token check
let token = window.localStorage.getItem("token")
if (token) {
  token = JSON.parse(token)
  const user = jwt_decode(token)
  store.dispatch({
    type: LOAD_USER_SUCCESS,
    payload: user
  })

}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

