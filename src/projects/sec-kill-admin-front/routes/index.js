import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AsyncComponent from '../utils/AsyncComponent';

import json from './routerConf.json';



class Routes extends React.Component {

  componentDidMount = () => {
    console.log(json);
  }

  render() {
    return (
      <Switch>
        {
          json.map((v, i) => {
            console.log(v);
            return (
              <Route key={i} path={v} component={
                AsyncComponent(() => import(/*webpackChunkName: 'home'*/`${v}`))
              }></Route>
            )
          }
          )
        }
      </Switch >
    )
  }
}

export default Routes;
