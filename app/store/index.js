import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

let enhancer = applyMiddleware(
  sagaMiddleware,
  createLogger(),
);

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const {composeWithDevTools} = require('redux-devtools-extension');

  enhancer = composeWithDevTools(enhancer);
}

export function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  let task = sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('../reducers').default);
    });

    module.hot.accept('../sagas', () => {
      task.cancel();
      // eslint-disable-next-line global-require
      task = sagaMiddleware.run(require('../sagas').default);
    });
  }

  return store;
}
