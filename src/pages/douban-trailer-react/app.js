import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import reducers from './reducers'
import { Routes } from "./routes";
const store = createStore(reducers, compose(
  applyMiddleware(thunk)
))


import Home from '@routes/Home';
const About = () => <div>About</div>
const Topics = () => <div>Topics</div>
import New from './routes/New';
import './app.less';

ReactDom.render(
  <Provider store={store}>
    <Router>
      {/* <Routes /> */}
      <div>
            <ul>
              <li><Link to='/'>首页</Link></li>
              <li><Link to='/about'>关于</Link></li>
              <li><Link to='/topics'>主题列表</Link></li>
            </ul>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/topics' component={Topics} />
      </div>
    </Router>
  </Provider>  
  ,
  document.querySelector('#app'));
