import {combineReducers} from 'redux';
import entities from './entities';
import messages from './messages';
import navigation from './navigation';
import requests from './requests';

const root = combineReducers({
  entities,
  messages,
  navigation,
  requests,
});

export default root;
