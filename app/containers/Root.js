import m from 'mithril';
import Explore from './Explore';
import Message from './Message';

const Root = {
  view({attrs}) {
    return (
      <div>
        <Explore {...attrs} />
        <Message {...attrs} />
      </div>
    );
  },
};

export default Root;
