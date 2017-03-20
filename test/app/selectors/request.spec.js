import expect from 'expect';
import freeze from 'deep-freeze';

import {
  isRequesting,
  wasRequested,
} from '../../../app/selectors/request';

describe('request selectors', function () {
  describe('#isRequesting', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          requests: {},
        });

        expect(() => isRequesting(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns false if request is not pending', function () {
        const state = freeze({
          requests: {},
        });

        expect(isRequesting(state, 'fetch_users')).toBe(false);
      });

      it('returns true if request is pending', function () {
        const state = freeze({
          requests: {
            fetch_users: {
              pending: true,
              completed: false,
            },
          },
        });

        expect(isRequesting(state, 'fetch_users')).toBe(true);
      });

      it('returns false if request has completed', function () {
        const state = freeze({
          requests: {
            fetch_users: {
              pending: false,
              completed: true,
            },
          },
        });

        expect(isRequesting(state, 'fetch_users')).toBe(false);
      });
    });
  });

  describe('#wasRequested', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        const state = freeze({
          requests: {},
        });

        expect(() => wasRequested(state)).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('returns false if request is not pending', function () {
        const state = freeze({
          requests: {},
        });

        expect(wasRequested(state, 'fetch_users')).toBe(false);
      });

      it('returns false if request is pending', function () {
        const state = freeze({
          requests: {
            fetch_users: {
              pending: true,
              completed: false,
            },
          },
        });

        expect(wasRequested(state, 'fetch_users')).toBe(false);
      });

      it('returns true if request has completed', function () {
        const state = freeze({
          requests: {
            fetch_users: {
              pending: false,
              completed: true,
            },
          },
        });

        expect(wasRequested(state, 'fetch_users')).toBe(true);
      });
    });
  });
});
