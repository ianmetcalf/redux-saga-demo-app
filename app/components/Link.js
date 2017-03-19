import m from 'mithril';
import history from '../history';

const Link = {
  view({attrs: {to = '', ...attrs}, children}) {
    return (
      <a
        {...attrs}
        href={history.createHref({pathname: to})}
        onclick={e => {
          const modified = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;

          if (!modified && e.button === 0 && !e.defaultPrevented) {
            e.preventDefault();
            history.push(to);
          }
        }}
      >
        {children}
      </a>
    );
  },
};

export default Link;
