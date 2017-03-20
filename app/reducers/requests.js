import {createReducer} from './helpers';

import {
  PENDING_REQUEST,
  COMPLETED_REQUEST,
} from '../actions';

const reducer = createReducer({}, {
  [PENDING_REQUEST](state, action) {
    const {
      meta: {
        id,
      } = {},
    } = action;

    if (id) {
      return {
        ...state,
        [id]: {
          pending: true,
          completed: false,
        },
      };
    }

    return state;
  },

  [COMPLETED_REQUEST](state, action) {
    const {
      meta: {
        id,
      } = {},
    } = action;

    if (id) {
      return {
        ...state,
        [id]: {
          pending: false,
          completed: true,
        },
      };
    }

    return state;
  },
});

export default reducer;
