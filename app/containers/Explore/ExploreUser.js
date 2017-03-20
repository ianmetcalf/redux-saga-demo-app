import m from 'mithril';
import classNames from 'classnames';
import ListGithubRepos from '../../components/ListGithubRepos';

import {
  getEntityById,
  isRequesting,
} from '../../selectors';

const ExploreUser = {
  view({attrs}) {
    const {
      store,
      className = '',
      params: {
        user: login,
      } = {},
    } = attrs;

    const state = store.getState();
    const user = getEntityById(state, 'users', login) || {login};

    const starred = (user.starred || []).map(id => (
      getEntityById(state, 'repos', id)
    )).filter(r => r);

    const requestId = `fetch_starred_repos_for_${ login }`;
    const loading = isRequesting(state, requestId);

    return (
      <div className={classNames(className, {loading})}>
        <h1>Repos starred by {user.login}</h1>

        {starred.length ? (
          <ListGithubRepos repos={starred} />
        ) : null}
      </div>
    );
  },
};

export default ExploreUser;
