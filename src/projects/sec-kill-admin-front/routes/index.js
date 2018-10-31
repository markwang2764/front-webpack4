import React from 'react'
import { Route, Switch, Redirect, IndexRoute } from 'react-router-dom'
import AsyncComponent from '@components/AsyncComponent';
import App from '../app.js';

const requireAuth = (props, path) => {
  const toPath = true ? "/sec-kill-admin-front/login" : path
  return <Redirect to={toPath} />
}



class Routes extends React.Component {

  render() {
    return (
      <Switch>
        <Route exact path="/sec-kill-admin-front/login" component={
          AsyncComponent(() => import(/*webpackChunkName: 'login'*/'./Login'))
        } />

        <App>
          <Route exact path='/' render={props => requireAuth(props, '/sec-kill-admin-front/goods-admin-list')} />

          <Route exact path='/sec-kill-admin-front/entry.html' component={props => requireAuth(props, '/sec-kill-admin-front/goods-admin-list')} />

          <Route exact path='/sec-kill-admin-front/goods-admin-list' component={
            AsyncComponent(() => import(/*webpackChunkName: 'goods-admin-list'*/'./Goods/goods-admin-list'))
          }></Route>

          <Route exact path='/sec-kill-admin-front/order-admin-list' component={
            AsyncComponent(() => import(/*webpackChunkName: 'order-admin-list'*/'./Orders/order-admin-list'))
          }></Route>

        </App>


      </Switch >
    )
  }
}

export default Routes;
