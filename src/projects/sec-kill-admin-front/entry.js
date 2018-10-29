import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import reducers from './reducers'
const store = createStore(reducers, compose(applyMiddleware(thunk)))

import Home from './routes/Home';
import './entry.less';

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </Provider>, document.querySelector('#app'));
