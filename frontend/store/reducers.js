import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import collections from './collections/reducer';

// TODO: Папка store/resource — содержит все необходимое для взаимодействия с api посредством redux-saga.
// TODO: сомтреть конец страницы https://rajdee.gitbooks.io/redux-in-russian/content/docs/recipes/ReducingBoilerplate.html?q=

export default (history) => combineReducers({
  router: connectRouter(history),
  collections
});
