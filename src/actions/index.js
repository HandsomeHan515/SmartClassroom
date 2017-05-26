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

//Detail
export const DETAIL = 'DETAIL'
export const GET_DETAIL = 'GET_DETAIL'

export const ADD_DETAIL = 'ADD_DETAIL'
export const ADD_RESULT_DETAIL = 'ADD_RESULT_DETAIL'

export const DEL_DETAIL = 'DEL_DETAIL'
export const DEL_RESULT_DETAIL = 'DEL_RESULT_DETAIL'

export const detailStatus = createRequestTypes('DETAIL')

export const getDetail = () => action(DETAIL)

export const addDetail = payload => action(ADD_DETAIL, payload)

//Student
export const STUDENT = 'STUDENT'
export const GET_STUDENT = 'GET_STUDENT'

export const studentStatus = createRequestTypes('STUDENT')

export const getStudent = () => action(STUDENT)

//Search
export const NAME_SEARCH = 'NAME_SEARCH'
export const GET_NAME_SEARCH = 'GET_NAME_SEARCH'

export const nameSearchStatus = createRequestTypes('NAME_SEARCH')

export const getNameSerch = payload => action(NAME_SEARCH, payload)

export const TIME_SEARCH = 'TIME_SEARCH'
export const GET_TIME_SEARCH = 'GET_TIME_SEARCH'

export const timeSearchStatus = createRequestTypes('TIME_SEARCH')

export const getTimeSearch = payload => action(TIME_SEARCH, payload)
