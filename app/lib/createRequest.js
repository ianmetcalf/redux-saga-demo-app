import {normalize} from 'normalizr';

export default function createRequest({
  url,
  method = 'GET',
  schema,
  ...options
} = {}) {
  if (typeof url !== 'string') throw new Error('Must specify a url to create request');

  let opts = options;

  if (opts.body && typeof opts.body !== 'string') {
    opts = {
      ...opts,
      headers: {
        ...opts.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(opts.body),
    };
  }

  return fetch(url, {
    credentials: 'same-origin',
    method,
    ...opts,
  })

  .then(resp => (
    resp.json()

    .then(json => ({
      error: !resp.ok,
      payload: resp.ok && schema ? normalize(json, schema) : json,
    }))

    .catch(() => ({
      error: true,
      payload: {
        message: 'Server Error',
      },
    }))
  ))

  .catch(() => ({
    error: true,
    payload: {
      message: 'Network Error',
    },
  }));
}
