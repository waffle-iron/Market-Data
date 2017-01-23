import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import store from './store/configStore'

import Root from './containers/Root'
import Home from './containers/Home'
import Dashboard from './containers/Dashboard'
import ProfilePage from './containers/ProfilePage'
import Welcome from './containers/Welcome'
import NoMatch from './containers/NoMatch'

console.log('User Logged In:', store.getState().user.loggedIn)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Root}>
        <IndexRoute component={Welcome} />
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/user/:user' component={ProfilePage} />
        <Route path='*' component={NoMatch} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application')
)
