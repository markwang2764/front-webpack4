import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import AsyncComponent from '../utils/AsyncComponent';
import App from '../app.js';




class Routes extends React.Component {

  render() {
    return (
      <Switch>

        <App>
          <Route exact path='/' component={
            AsyncComponent(() => import(/*webpackChunkName: 'goods-admin-list'*/'./Goods/goods-admin-list'))
          }></Route>

          <Route exact path='/sec-kill-admin-front/entry.html' component={
            AsyncComponent(() => import(/*webpackChunkName: 'goods-admin-list'*/'./Goods/goods-admin-list'))
          }></Route>

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
