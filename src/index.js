import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import { Home, Search, Details, PersonMessage, Contacts } from './containers'

import { reducer } from './reducers'
import rootSaga from './sagas'
import { state } from './store'
import './index.css'

let sagaMiddleware = createSagaMiddleware()

let enhancer = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducer, state, enhancer)

sagaMiddleware.run(rootSaga)

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
