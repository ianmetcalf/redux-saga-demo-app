import m from 'mithril';
import Link from '../components/Link';

import {
  isActiveRoute,
} from '../selectors';

const Test = {
  view({attrs: {store}}) {
    const state = store.getState();

    return (
      <p>
        {!isActiveRoute(state, '/test') ? (
          <Link to="/test">Test Link</Link>
        ) : (
          <Link to="/">Back</Link>
        )}
      </p>
    );
  },
};

export default Test;
