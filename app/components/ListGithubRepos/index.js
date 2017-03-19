import m from 'mithril';
import classNames from 'classnames';
import Link from '../Link';
import styles from './style.css';

const ListGithubRepos = {
  view({attrs}) {
    const {
      className = '',
      repos = [],
    } = attrs;

    return (
      <table className={classNames(styles.container, className)}>
        <thead>
          <tr>
            <th />
            <th>Stars</th>
            <th>Forks</th>
            <th>Issues</th>
          </tr>
        </thead>
        <tbody>
          {repos.map(repo => (
            <tr>
              <td><Link to={`/explore/${ repo.full_name }`}>{repo.full_name}</Link></td>
              <td><span className={styles.stat}>{repo.stargazers_count}</span></td>
              <td><span className={styles.stat}>{repo.forks_count}</span></td>
              <td><span className={styles.stat}>{repo.open_issues_count}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
};

export default ListGithubRepos;
