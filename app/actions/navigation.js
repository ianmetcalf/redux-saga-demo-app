import {
  NAVIGATE,
} from './constants';

export function setNavigation(payload = {}) {
  return {
    type: NAVIGATE,
    payload,
  };
}
