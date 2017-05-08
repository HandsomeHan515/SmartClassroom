//fetch status
const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

//wrap funtions
const createRequestTypes = base => {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

const action = (type, payload = {}) => {
  return { type, ...payload }
}

//type of message
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

//action of message
export const addMessage = message => ({
  type: ADD_MESSAGE,
  message
})

export const deleteMessage = messageID => ({
  type: DELETE_MESSAGE,
  messageID
})

//Detail
export const DETAIL = 'DETAIL'
export const GET_DETAIL = 'GET_DETAIL'

