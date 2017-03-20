import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/requests';

import {
  PENDING_REQUEST,
  COMPLETED_REQUEST,
} from '../../../app/actions';

describe('requests reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual({});
  });

  context('when called with pending request action', function () {
    it('ignores action without id', function () {
      const state = freeze({});

      const action = {
        type: PENDING_REQUEST,
      };

      expect(reducer(state, action)).toEqual(state);
    });

    it('adds request with pending flag set', function () {
      const state = freeze({});

      const action = {
        type: PENDING_REQUEST,
        meta: {
          id: 'fetch_users',
        },
      };

      expect(reducer(state, action)).toEqual({
        fetch_users: {
          pending: true,
          completed: false,
        },
      });
    });
  });

  context('when called with completed request action', function () {
    it('ignores action without id', function () {
      const state = freeze({});

      const action = {
        type: COMPLETED_REQUEST,
      };

      expect(reducer(state, action)).toEqual(state);
    });

    it('updates request with completed flag set', function () {
      const state = freeze({
        fetch_users: {
          pending: true,
          completed: false,
        },
      });

      const action = {
        type: COMPLETED_REQUEST,
        meta: {
          id: 'fetch_users',
        },
      };

      expect(reducer(state, action)).toEqual({
        fetch_users: {
          pending: false,
          completed: true,
        },
      });
    });
  });
});
