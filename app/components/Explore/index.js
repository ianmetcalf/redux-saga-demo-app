import m from 'mithril';
import classNames from 'classnames';
import history from '../../history';
import styles from './style.css';

const Explore = {
  view({attrs, children}) {
    const {
      className = '',
    } = attrs;

    return (
      <div className={classNames(styles.container, className)}>
        <label className={styles.explore}>
          Explore
          <input
            type="text"
            size="45"
            onkeyup={handleKeyUp}
          />
        </label>

        <hr />

        {children}
      </div>
    );
  },
};

function handleKeyUp(e) {
  if (e.keyCode === 13) {
    const value = this.value;

    history.push(`/explore/${ value }`);

    this.value = '';
  }
}

export default Explore;
