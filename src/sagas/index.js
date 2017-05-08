import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from '../actions'
import * as apis from '../service/apis'

export function* watchGetMessage() {
  while (true) {
    yield take(actions.MESSAGE)
    yield put({ type: actions.messageStatus.REQUEST })

    try {
      const message = yield call(apis.getMessage)

      yield put({ type: actions.GET_MESSAGE, message: message.reverse() })

      yield put({ type: actions.messageStatus.SUCCESS })
    } catch (err) {
      yield put({ type: actions.messageStatus.FAILURE })
    }
  }
}

export function* watchAddMessage() {
  while (true) {
    const { payload } = yield take(actions.ADD_MESSAGE)

    const message = yield call(apis.createMessage, payload)
    yield put({ type: actions.ADD_RESULT_MESSAGE, message })
  }
}

export function* watchDelMessage() {
  while (true) {
    const { payload } = yield take(actions.DEL_MESSAGE)
    const { id } = payload

    yield call(apis.delMessage, id)
    yield put({ type: actions.DEL_RESULT_MESSAGE, id })
  }
}

export default function* rootSage() {
  yield [
    fork(watchGetMessage),
    fork(watchAddMessage),
    fork(watchDelMessage),
  ]
}