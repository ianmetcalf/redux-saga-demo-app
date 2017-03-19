import {eventChannel, buffers} from 'redux-saga';

export default function createHistoryChannel(history) {
  function subscribe(emitter) {
    const initial = history.location;

    if (initial) {
      emitter(initial);
    }

    return history.listen(value => {
      emitter(value);
    });
  }

  return eventChannel(subscribe, buffers.sliding(1));
}
