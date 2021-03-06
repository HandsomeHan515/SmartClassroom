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
  detail: changeStatus([actions.detailStatus.REQUEST, actions.detailStatus.SUCCESS, actions.detailStatus.FAILURE]),
  student: changeStatus([actions.studentStatus.REQUEST, actions.studentStatus.SUCCESS, actions.studentStatus.FAILURE]),
  nameSearch: changeStatus([actions.nameSearchStatus.REQUEST, actions.nameSearchStatus.SUCCESS, actions.nameSearchStatus.FAILURE]),
  timeSearch: changeStatus([actions.timeSearchStatus.REQUEST, actions.timeSearchStatus.SUCCESS, actions.timeSearchStatus.FAILURE]),
})

const message = (state = [], action) => {
  switch (action.type) {
    case actions.GET_MESSAGE:
      return Object.assign([], state, action.message)

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
  switch (action.type) {
    case actions.GET_DETAIL:
      return Object.assign([], state, action.detail)

    case actions.ADD_RESULT_DETAIL:
      return [
        action.message,
        ...state,
      ]

    default:
      return state
  }
}

const student = (state = [], action) => {
  switch (action.type) {
    case actions.GET_STUDENT:
      return Object.assign([], state, action.student)

    default:
      return state
  }
}

const nameSearch = (state = [], action) => {
  switch (action.type) {
    case actions.GET_NAME_SEARCH:
      return Object.assign([], state, action.student)

    default:
      return state
  }
}

const timeSearch = (state = [], action) => {
  switch (action.type) {
    case actions.GET_TIME_SEARCH:
      return action.student

    default:
      return state
  }
}

export const result = combineReducers({
  message,
  detail,
  student,
  nameSearch,
  timeSearch,
})

export const reducer = combineReducers({
  result,
  status,
})
