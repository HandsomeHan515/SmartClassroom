import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import { Home, Search, Details, PersonMessage, Contacts } from './containers'

import { reducer } from './reducers'
import { initialState } from './store'
import './index.css'

const store = createStore(reducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' name='home' staticName={true} component={App}>
        <IndexRoute name='home' staticName={true} component={Home} />
        <Route path='/search' name='search' staticName={true} component={Search} />
        <Route path='/details' name='details' staticName={true} component={Details} />
        <Route path='/personmessage' name='personmessage' staticName={true} component={PersonMessage} />
        <Route path='/contacts' name='contacts' staticName={true} component={Contacts} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
