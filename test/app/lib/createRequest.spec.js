import expect from 'expect';
import fetchMock from 'fetch-mock';
import {schema} from 'normalizr';
import createRequest from '../../../app/lib/createRequest';

describe('create request', function () {
  beforeEach('mock server api', function () {
    fetchMock.get('/api/users', {
      body: [
        {
          id: 1,
          name: 'Some User',
          teams: [
            {
              id: 1,
              name: 'Some Team',
            },
          ],
        },
      ],
    });
  });

  afterEach('restore fetch', function () {
    fetchMock.restore();
  });

  context('when called without url', function () {
    it('throws missing url error', function () {
      return expect(() => createRequest()).toThrow(/must specify a url/i);
    });
  });

  context('when called with url', function () {
    it('creates request and returns response', function () {
      return createRequest({
        url: '/api/users',
      })

      .then(resp => expect(resp).toMatch({
        payload: [
          {
            id: 1,
            name: 'Some User',
            teams: [
              {
                id: 1,
                name: 'Some Team',
              },
            ],
          },
        ],
      }));
    });
  });

  context('when called with method', function () {
    beforeEach('mock server api', function () {
      fetchMock.post('/api/users', {
        body: [
          {
            id: 1,
            name: 'Some User',
          },
        ],
      });
    });

    it('creates request and returns response', function () {
      return createRequest({
        url: '/api/users',
        method: 'POST',
      })

      .then(resp => expect(resp).toMatch({
        payload: [
          {
            id: 1,
            name: 'Some User',
          },
        ],
      }));
    });
  });

  context('when called with schema', function () {
    const userSchema = new schema.Entity('users');
    const teamSchema = new schema.Entity('teams');

    userSchema.define({
      teams: [teamSchema],
    });

    it('creates request and returns normalized response', function () {
      return createRequest({
        url: '/api/users',
        schema: [userSchema],
      })

      .then(resp => expect(resp).toMatch({
        payload: {
          result: [1],
          entities: {
            users: {
              1: {
                id: 1,
                name: 'Some User',
                teams: [1],
              },
            },
            teams: {
              1: {
                id: 1,
                name: 'Some Team',
              },
            },
          },
        },
      }));
    });
  });

  context('when server returns error', function () {
    beforeEach('mock server api', function () {
      fetchMock.get('/api/users/1', {
        body: {
          message: 'Not Found',
        },
        status: 404,
      });
    });

    it('creates request and returns response', function () {
      return createRequest({
        url: '/api/users/1',
      })

      .then(resp => expect(resp).toMatch({
        error: true,
        payload: {
          message: 'Not Found',
        },
      }));
    });
  });

  context('when server returns non-json response', function () {
    beforeEach('mock server api', function () {
      fetchMock.get('/api/users/1', {
        body: 'Error',
        status: 500,
      });
    });

    it('creates request and returns server error', function () {
      return createRequest({
        url: '/api/users/1',
      })

      .then(resp => expect(resp).toMatch({
        error: true,
        payload: {
          message: 'Server Error',
        },
      }));
    });
  });

  context('when server is not available', function () {
    beforeEach('mock server api', function () {
      fetchMock.get('/api/users/1', {
        throws: new Error(),
      });
    });

    it('creates request and returns network error', function () {
      return createRequest({
        url: '/api/users/1',
      })

      .then(resp => expect(resp).toMatch({
        error: true,
        payload: {
          message: 'Network Error',
        },
      }));
    });
  });
});
