import m from 'mithril';
import Test from './Test';

const Root = {
  view({attrs}) {
    return (
      <div>
        <Test {...attrs} />
      </div>
    );
  },
};

export default Root;
