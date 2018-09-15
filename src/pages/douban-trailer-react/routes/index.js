import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AsyncComponent from './AsyncComponent';
import New from './New'
// const New = AsyncComponent(() => import(/*webpackChunkName: 'new'*/'./New'))

class Routes extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path='/' component={
            AsyncComponent(() => import(/*webpackChunkName: 'home'*/'./Home'))
          }></Route>

          <Route path='/dnew' component={New}></Route> 
        </Switch>
      </div>
    )
  }
}
  
export default Routes;
