import expect from 'expect';

import {
  setNavigation,
} from '../../../app/actions/navigation';

import {
  NAVIGATE,
} from '../../../app/actions/constants';

describe('navigation actions', function () {
  describe('#setNavigation', function () {
    it('creates navigate action', function () {
      return expect(setNavigation({
        pathname: '/some/thing',
        route: '/some/:part',
        params: {
          part: 'thing',
        },
      })).toMatch({
        type: NAVIGATE,
        payload: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      });
    });
  });
});
