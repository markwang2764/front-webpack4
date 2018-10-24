import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import reducers from './reducers'
import { Routes } from "./routes";
const store = createStore(reducers, compose(applyMiddleware(thunk)))

import Home from './routes/Home';
const About = () => <div>Aboutfdsadsa</div>
const Topics = () => <div>Topics</div>
import './entry.less';

ReactDom.render(
  <Provider store={store}>
    <Router>
      {/* <Routes /> */}
      <div>
        <ul>
          <li>
            <Link to='/react-app'>首页</Link>
          </li>
          <li>
            <Link to='/react-app/about'>关于ddsa</Link>
          </li>
          <li>
            <Link to='/react-app/topics'>主题列表</Link>
          </li>
        </ul>
        <Route exact path='/react-app' component={Home} />
        <Route path='/react-app/about' component={About} />
        <Route path='/react-app/topics' component={Topics} />
      </div>
    </Router>
  </Provider>, document.querySelector('#app'));
