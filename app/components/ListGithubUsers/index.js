import m from 'mithril';
import classNames from 'classnames';
import Link from '../Link';
import styles from './style.css';

const ListGithubUsers = {
  view({attrs}) {
    const {
      className = '',
      users = [],
    } = attrs;

    return (
      <ul className={classNames(styles.container, className)}>
        {users.map(user => (
          <li>
            <Link to={`/explore/${ user.login }`}>
              <img src={user.avatar_url} alt="Avatar" />
              <h3>{user.name || user.login}</h3>
            </Link>
          </li>
        ))}
      </ul>
    );
  },
};

export default ListGithubUsers;
