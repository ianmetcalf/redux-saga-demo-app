import expect from 'expect';

import {
  showMessage,
  clearMessage,
  resetMessages,
} from '../../../app/actions/message';

import {
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  RESET_MESSAGES,
} from '../../../app/actions/constants';

describe('message actions', function () {
  describe('#showMessage', function () {
    context('when called without body', function () {
      it('throws missing body error', function () {
        return expect(() => showMessage()).toThrow(/must specify a body/i);
      });
    });

    context('when called with empty body', function () {
      it('throws missing message error', function () {
        return expect(() => showMessage({body: ''})).toThrow(/must specify a body/i);
      });
    });

    context('when called with body', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
        })).toMatch({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
          },
        });
      });
    });

    context('when called with type', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
          type: 'error',
        })).toMatch({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
            type: 'error',
          },
        });
      });
    });

    context('when called with id', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          id: 'message_id',
          body: 'Some message',
        })).toMatch({
          type: SHOW_MESSAGE,
          payload: {
            id: 'message_id',
            body: 'Some message',
          },
        });
      });
    });

    context('when called with duration', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
          duration: 10,
        })).toMatch({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
            duration: 10,
          },
        });
      });
    });

    context('when called with additional props', function () {
      it('creates show message action', function () {
        return expect(showMessage({
          body: 'Some message',
          prop: 'some prop',
        })).toMatch({
          type: SHOW_MESSAGE,
          payload: {
            body: 'Some message',
            prop: 'some prop',
          },
        });
      });
    });
  });

  describe('#clearMessage', function () {
    context('when called without message', function () {
      it('throws missing message error', function () {
        return expect(() => clearMessage()).toThrow(/must specify a message/i);
      });
    });

    context('when called with message', function () {
      it('creates clear message action', function () {
        return expect(clearMessage('message_id')).toMatch({
          type: CLEAR_MESSAGE,
          payload: {
            id: 'message_id',
          },
        });
      });
    });
  });

  describe('#resetMessages', function () {
    it('creates reset messages action', function () {
      return expect(resetMessages()).toMatch({
        type: RESET_MESSAGES,
      });
    });
  });
});
