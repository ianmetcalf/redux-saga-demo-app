import m from 'mithril';
import classNames from 'classnames';
import ListGithubUsers from '../../components/ListGithubUsers';

import {
  getEntityById,
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

    return (
      <div className={classNames(className)}>
        <h1>Stargazers for {repo.name}</h1>

        {stargazers.length ? (
          <ListGithubUsers users={stargazers} />
        ) : null}
      </div>
    );
  },
};

export default ExploreRepo;
