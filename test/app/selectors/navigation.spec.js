import expect from 'expect';
import freeze from 'deep-freeze';

import {
  getNavigation,
  isActiveRoute,
} from '../../../app/selectors/navigation';

describe('navigation selectors', function () {
  describe('#getNavigation', function () {
    it('returns current navigation', function () {
      const state = freeze({
        navigation: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      });

      expect(getNavigation(state)).toEqual({
        pathname: '/some/thing',
        route: '/some/:part',
        params: {
          part: 'thing',
        },
      });
    });
  });

  describe('#isActiveRoute', function () {
    it('returns true if matches pathname', function () {
      const state = freeze({
        navigation: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      });

      expect(isActiveRoute(state, '/some/thing')).toBe(true);
    });

    it('returns true if matches route', function () {
      const state = freeze({
        navigation: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      });

      expect(isActiveRoute(state, '/some/:part')).toBe(true);
    });

    it('returns false if nothing matches', function () {
      const state = freeze({
        navigation: {
          pathname: '/some/thing',
          route: '/some/:part',
          params: {
            part: 'thing',
          },
        },
      });

      expect(isActiveRoute(state, '/some/other')).toBe(false);
    });
  });
});
