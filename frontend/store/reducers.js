import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import users from './users/reducer';
import tracks from './tracks/reducer';

// TODO: Папка store/resource — содержит все необходимое для взаимодействия с api посредством redux-saga.
// TODO: сомтреть конец страницы https://rajdee.gitbooks.io/redux-in-russian/content/docs/recipes/ReducingBoilerplate.html?q=

export default (history) => combineReducers({
  router: connectRouter(history),
  users,
  tracks
});
