import {
  PENDING_REQUEST,
  COMPLETED_REQUEST,
} from './constants';

export function pendingRequest(id) {
  if (!id) throw new Error('Must specify an id for request');

  return {
    type: PENDING_REQUEST,
    meta: {
      id,
    },
  };
}

export function completedRequest(id, {error = false, payload = {}} = {}) {
  if (!id) throw new Error('Must specify an id for request');

  return {
    type: COMPLETED_REQUEST,
    error,
    payload,
    meta: {
      id,
    },
  };
}
