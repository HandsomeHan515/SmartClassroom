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

//Message
//aciton of message
export const MESSAGE = 'MESSAGE'

export const GET_MESSAGE = 'GET_MESSAGE'

export const ADD_MESSAGE = 'ADD_MESSAGE'
export const ADD_RESULT_MESSAGE = 'ADD_RESULT_MESSAGE'

export const DEL_MESSAGE = 'DEL_MESSAGE'
export const DEL_RESULT_MESSAGE = 'DEL_RESULT_MESSAGE'

//type of status
export const messageStatus = createRequestTypes('MESSAGE')

// action of message
export const getMessage = () => action(MESSAGE)

export const addMessage = payload => action(ADD_MESSAGE, payload)

export const deleteMessage = payload => action(DEL_MESSAGE, payload)
