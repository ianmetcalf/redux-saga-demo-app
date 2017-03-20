import expect from 'expect';

import {
  pendingRequest,
  completedRequest,
} from '../../../app/actions/request';

import {
  PENDING_REQUEST,
  COMPLETED_REQUEST,
} from '../../../app/actions/constants';

describe('request actions', function () {
  describe('#pendingRequest', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        return expect(() => pendingRequest()).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('creates pending request action', function () {
        return expect(pendingRequest('fetch_users')).toMatch({
          type: PENDING_REQUEST,
          meta: {
            id: 'fetch_users',
          },
        });
      });
    });
  });

  describe('#completedRequest', function () {
    context('when called without id', function () {
      it('throws missing id error', function () {
        return expect(() => completedRequest()).toThrow(/must specify an id/i);
      });
    });

    context('when called with id', function () {
      it('creates completed request action', function () {
        return expect(completedRequest('fetch_users')).toMatch({
          type: COMPLETED_REQUEST,
          error: false,
          meta: {
            id: 'fetch_users',
          },
        });
      });
    });

    context('when called with error flag', function () {
      it('creates completed request action', function () {
        return expect(completedRequest('fetch_users', {
          error: true,
        })).toMatch({
          type: COMPLETED_REQUEST,
          error: true,
          meta: {
            id: 'fetch_users',
          },
        });
      });
    });

    context('when called with payload', function () {
      it('creates completed request action', function () {
        return expect(completedRequest('fetch_users', {
          payload: {
            entities: {
              1: {id: 1, name: 'Some Users'},
            },
          },
        })).toMatch({
          type: COMPLETED_REQUEST,
          error: false,
          payload: {
            entities: {
              1: {id: 1, name: 'Some Users'},
            },
          },
          meta: {
            id: 'fetch_users',
          },
        });
      });
    });
  });
});
