import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AsyncComponent from '../utils/AsyncComponent';

class Routes extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={
            AsyncComponent(() => import(/*webpackChunkName: 'home'*/'./Home'))
          }></Route>

          <Route path='/new' component={
            AsyncComponent(() => import(/*webpackChunkName: 'new'*/'./New'))
          }></Route>
        </Switch>
      </div>
    )
  }
}

export default Routes;
