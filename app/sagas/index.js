import 'regenerator-runtime/runtime';
import {fork} from 'redux-saga/effects';
import {watchHistory} from './history';

export default function* rootSaga() {
  yield [
    fork(watchHistory),
  ];
}
