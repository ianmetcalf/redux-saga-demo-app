import {combineReducers} from 'redux';
import entities from './entities';
import navigation from './navigation';
import requests from './requests';

const root = combineReducers({
  entities,
  navigation,
  requests,
});

export default root;
