import {
  NAVIGATE,
} from '../actions';

const reducer = (state = {}, action) => {
  const {
    type,
    payload = {},
  } = action;

  if (type === NAVIGATE) {
    return payload;
  }

  return state;
};

export default reducer;
