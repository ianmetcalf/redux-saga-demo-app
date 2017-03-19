import m from 'mithril';
import Explore from './Explore';

const Root = {
  view({attrs}) {
    return (
      <div>
        <Explore {...attrs} />
      </div>
    );
  },
};

export default Root;
