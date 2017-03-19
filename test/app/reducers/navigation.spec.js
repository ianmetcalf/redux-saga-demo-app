import expect from 'expect';
import freeze from 'deep-freeze';
import reducer from '../../../app/reducers/navigation';

import {
  NAVIGATE,
} from '../../../app/actions';

describe('navigation reducer', function () {
  it('returns the initial state', function () {
    expect(reducer(undefined, {})).toEqual({});
  });

  context('when called with navigate action', function () {
    it('sets navigation', function () {
      const state = freeze({});

      const action = {
        type: NAVIGATE,
        payload: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      };

      expect(reducer(state, action)).toEqual({
        pathname: '/some/thing',
        route: '/some/:part',
        params: {
          part: 'thing',
        },
      });
    });

    it('replaces previous navigation', function () {
      const state = freeze({
        pathname: '/some/thing',
        route: '/some/:part',
        params: {
          part: 'thing',
        },
      });

      const action = {
        type: NAVIGATE,
        payload: {
          pathname: '/some/other/thing',
        },
      };

      expect(reducer(state, action)).toEqual({
        pathname: '/some/other/thing',
      });
    });
  });
});
