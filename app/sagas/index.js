import 'regenerator-runtime/runtime';
import {fork} from 'redux-saga/effects';
import {watchHistory} from './history';
import {exploreUser, exploreRepo} from './explore';

export default function* rootSaga() {
  yield [
    fork(watchHistory, {
      '/explore/:user': exploreUser,
      '/explore/:owner/:repo': exploreRepo,
    }),
  ];
}
