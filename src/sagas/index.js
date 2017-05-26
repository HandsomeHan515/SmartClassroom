import { take, put, call, fork } from 'redux-saga/effects'
import * as actions from '../actions'
import * as apis from '../service/apis'

export function* watchGetMessage() {
  while (true) {
    yield take(actions.MESSAGE)
    yield put({ type: actions.messageStatus.REQUEST })

    try {
      const message = yield call(apis.getMessage)

      yield put({ type: actions.GET_MESSAGE, message })

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

export function* watchGetDetail() {
  while (true) {
    yield take(actions.DETAIL)
    yield put({ type: actions.detailStatus.REQUEST })

    try {
      const detail = yield call(apis.getDetail)

      yield put({ type: actions.GET_DETAIL, detail })

      yield put({ type: actions.detailStatus.SUCCESS })
    } catch (err) {
      yield put({ type: actions.detailStatus.FAILURE })
    }
  }
}

export function* watchAddDetail() {
  while (true) {
    const { payload } = yield take(actions.ADD_DETAIL)

    const detail = yield call(apis.createDetail, payload)
    yield put({ type: actions.ADD_RESULT_MESSAGE, detail })
  }
}

export function* watchGetStudent() {
  while (true) {
    yield take(actions.STUDENT)
    yield put({ type: actions.studentStatus.REQUEST })

    try {
      const student = yield call(apis.getStudent)

      yield put({ type: actions.GET_STUDENT, student: student.reverse() })

      yield put({ type: actions.studentStatus.SUCCESS })
    } catch (err) {
      yield put({ type: actions.studentStatus.FAILURE })
    }
  }
}

export function* watchGetNameSearch() {
  while (true) {
    const { name } = yield take(actions.NAME_SEARCH)
    yield put({ type: actions.nameSearchStatus.REQUEST })

    try {
      const student = yield call(apis.getNameSearch, name)
      if (student.length) {
        yield put({ type: actions.GET_NAME_SEARCH, student })
        yield put({ type: actions.nameSearchStatus.SUCCESS })
      }
    } catch (err) {
      yield put({ type: actions.nameSearchStatus.FAILURE })
      console.log('get name search filure', err)
    }
  }
}

export function* watchGetTimeSearch() {
  while (true) {
    const { time } = yield take(actions.TIME_SEARCH)

    yield put({ type: actions.timeSearchStatus.REQUEST })

    try {
      const student = yield call(apis.getTimeSearch, time)

      yield put({ type: actions.GET_TIME_SEARCH, student })
      yield put({ type: actions.timeSearchStatus.SUCCESS })
    } catch (err) {
      yield put({ type: actions.timeSearchStatus.FAILURE })
      console.log('get name search filure', err)
    }
  }
}

export default function* rootSage() {
  yield [
    fork(watchGetMessage),
    fork(watchAddMessage),
    fork(watchDelMessage),
    fork(watchGetDetail),
    fork(watchAddDetail),
    fork(watchGetStudent),
    fork(watchGetNameSearch),
    fork(watchGetTimeSearch),
  ]
}