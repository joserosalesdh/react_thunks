import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk' 
import { createStore, applyMiddleware } from 'redux' //applyMiddleware es una function que puede recibir todos los middlewares que queramos
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  data: [1,2,3],
  selected: 1,
}
function reducer (state= initialState, action){
  return state;
}

const store= createStore(reducer, applyMiddleware(thunk)) // El segundo argumento que recibe createStore son los middlewares que queremos utilizar 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
