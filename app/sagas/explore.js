import lowerCase from 'lodash/lowerCase';
import {call, select, put} from 'redux-saga/effects';
import {starredRepos, stargazers} from '../entities';
import createRequest from '../lib/createRequest';

import {
  pendingRequest,
  completedRequest,
  showMessage,
} from '../actions';

import {
  isRequesting,
  wasRequested,
} from '../selectors';

export function* exploreUser({user}) {
  yield call(fetchEntity, starredRepos(user));
}

export function* exploreRepo({owner, repo}) {
  yield call(fetchEntity, stargazers(`${ owner }/${ repo }`));
}

function* fetchEntity({id, url, schema}) {
  const requestId = `fetch_${ id }`;

  const state = yield select();

  if (!isRequesting(state, requestId) && !wasRequested(state, requestId)) {
    yield put(pendingRequest(requestId));

    const resp = yield call(createRequest, {url, schema});

    yield put(completedRequest(requestId, resp));

    if (resp.error) {
      yield put(showMessage({
        body: `Failed to ${ lowerCase(requestId) }`,
        type: 'error',
        duration: 10,
      }));
    }
  }
}
