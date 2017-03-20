import m from 'mithril';
import classNames from 'classnames';
import ListGithubUsers from '../../components/ListGithubUsers';

import {
  getEntityById,
  isRequesting,
} from '../../selectors';

const ExploreRepo = {
  view({attrs}) {
    const {
      store,
      className = '',
      params: {
        owner,
        repo: name,
      } = {},
    } = attrs;

    const state = store.getState();
    const repo = getEntityById(state, 'repos', `${ owner }/${ name }`) || {name};

    const stargazers = (repo.stargazers || []).map(id => (
      getEntityById(state, 'users', id)
    )).filter(u => u);

    const requestId = `fetch_stargazers_for_${ owner }/${ name }`;
    const loading = isRequesting(state, requestId);

    return (
      <div className={classNames(className, {loading})}>
        <h1>Stargazers for {repo.name}</h1>

        {stargazers.length ? (
          <ListGithubUsers users={stargazers} />
        ) : null}
      </div>
    );
  },
};

export default ExploreRepo;
