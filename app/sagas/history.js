import {takeLatest, put, call} from 'redux-saga/effects';
import ruta3 from 'ruta3';
import createHistoryChannel from '../lib/createHistoryChannel';
import history from '../history';

import {
  setNavigation,
} from '../actions';

export function* watchHistory(routes = {}) {
  const historyChannel = createHistoryChannel(history);

  const router = ruta3();

  Object.keys(routes).forEach(route => {
    router.addRoute(route, routes[route]);
  });

  yield takeLatest(historyChannel, navigate, router);
}

export function* navigate(router, {pathname, search}) {
  const {
    route = '',
    params = {},
    splats = [],
    action,
  } = router.match(pathname) || {};

  yield put(setNavigation({
    pathname,
    search,
    route,
    params,
    splats,
  }));

  if (typeof action === 'function') {
    yield call(action, params);
  }
}
