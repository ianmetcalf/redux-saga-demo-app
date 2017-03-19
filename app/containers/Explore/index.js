import m from 'mithril';
import classNames from 'classnames';
import ExploreComponent from '../../components/Explore';
import ExploreUser from './ExploreUser';
import ExploreRepo from './ExploreRepo';
import styles from './style.css';

import {
  getNavigation,
  isActiveRoute,
} from '../../selectors';

const Explore = {
  view({attrs}) {
    const {
      store,
      className = '',
    } = attrs;

    const state = store.getState();

    const {
      params = {},
    } = getNavigation(state);

    return (
      <ExploreComponent className={classNames(styles.container, className)}>
        {isActiveRoute(state, '/explore/:user') ? (
          <ExploreUser store={store} params={params} />
        ) : null}

        {isActiveRoute(state, '/explore/:owner/:repo') ? (
          <ExploreRepo store={store} params={params} />
        ) : null}
      </ExploreComponent>
    );
  },
};

export default Explore;
