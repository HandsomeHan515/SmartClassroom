import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import App from './App'
import { Home, Search, Details, Contacts, Classroom, Signin, Singup } from './containers'

import { appCore } from './service'
import { reducer } from './reducers'
import rootSaga from './sagas'
import { state } from './store'

import './index.css'

const sagaMiddleware = createSagaMiddleware()

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(reducer, state, enhancer)

sagaMiddleware.run(rootSaga)

const onEnter = (nextState, replace) => {
  if (!appCore.username) {
    if (!localStorage.getItem('username')) {
      replace({
        pathname: '/signin',
        query: {
          next: '/'
        }
      })
    } else {
      const username = localStorage.getItem('username')
      appCore.username = username
    }
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' name='home' staticName={true} component={App} onEnter={onEnter}>
        <IndexRoute name='home' staticName={true} component={Home} />
        <Route path='/search' name='search' staticName={true} component={Search} />
        <Route path='/detail' name='detail' staticName={true} component={Details} />
        <Route path='/message' name='message' staticName={true} component={Contacts} />
        <Route path='/classroom' name='classroom' staticName={true} component={Classroom} />
      </Route>
      <Route path='/signin' name='signin' staticName={true} component={Signin} />
      <Route path='/signup' name='signup' staticName={true} component={Singup} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
