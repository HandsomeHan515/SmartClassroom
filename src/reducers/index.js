import { combineReducers } from 'redux'
import * as Actions from '../actions'

const message = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_MESSAGE:
      return [
        action.message,
        ...state,
      ]

    case Actions.DELETE_MESSAGE:
      let tmpState = Object.assign([], state)
      tmpState = tmpState.filter(item => item.id !== action.messageID)
      return tmpState
      
    default:
      return state
  }
}

export const reducer = combineReducers({
  message,
})
