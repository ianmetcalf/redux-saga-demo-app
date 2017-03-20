import {takeEvery, race, take, call, put} from 'redux-saga/effects';
import {delay} from 'redux-saga';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  clearMessage,
} from '../actions';

export function* watchShowMessage() {
  yield takeEvery(action => {
    const {
      type,
      payload = {},
    } = action;

    return type === SHOW_MESSAGE && payload.duration > 0;
  }, clearMessageAfterDelay);
}

export function* clearMessageAfterDelay({payload: {id, duration} = {}}) {
  const result = yield race({
    cleared: take(action => {
      const {
        type,
        payload = {},
      } = action;

      return type === CLEAR_MESSAGE && payload.id === id;
    }),
    timeout: call(delay, duration * 1000),
  });

  if (!result.cleared) {
    yield put(clearMessage(id));
  }
}
