import { combineReducers } from 'redux'
import * as actions from '../actions'

const message = (state = [], action) => {
  switch (action.type) {
    case actions.ADD_MESSAGE:
      return [
        action.message,
        ...state,
      ]

    case actions.DELETE_MESSAGE:
      let tmpState = Object.assign([], state)
      tmpState = tmpState.filter(item => item.id !== action.messageID)
      return tmpState

    default:
      return state
  }
}

export const result = combineReducers({
  message
})

export const reducer = combineReducers({
  result,
})
