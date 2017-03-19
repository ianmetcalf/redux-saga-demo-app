import {combineReducers} from 'redux';
import entities from './entities';
import navigation from './navigation';

const root = combineReducers({
  entities,
  navigation,
});

export default root;
