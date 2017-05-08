import { combineReducers } from 'redux'
import * as actions from '../actions'

const changeStatus = types => {
  const [requestType, successType, failureType] = types

  return function updateStatus(state = {}, action) {
    switch (action.type) {
      case requestType:
        return Object.assign({}, state, {
          isFetching: true
        })

      case successType:
        return Object.assign({}, state, {
          isFetching: false,
        })

      case failureType:
        return Object.assign({}, state, {
          isFetching: false,
          errMsg: action.errMsg
        })

      default:
        return state
    }
  }
}

export const status = combineReducers({
  message: changeStatus([actions.messageStatus.REQUEST, actions.messageStatus.SUCCESS, actions.messageStatus.FAILURE]),
})

const message = (state = [], action) => {
  switch (action.type) {
    case actions.GET_MESSAGE:
      return [
        ...action.message, ...state,
      ]

    case actions.ADD_RESULT_MESSAGE:
      return [
        action.message,
        ...state,
      ]

    case actions.DEL_RESULT_MESSAGE:
      let tmpState = Object.assign([], state)
      tmpState = tmpState.filter(item => item.id !== action.id)

      return tmpState

    default:
      return state
  }
}

const detail = (state = [], action) => {
  return state
}

export const result = combineReducers({
  message,
  detail,
})

export const reducer = combineReducers({
  result,
  status,
})
