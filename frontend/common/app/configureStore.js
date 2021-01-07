import { routerMiddleware } from 'connected-react-router';
import history from 'history/browser';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import reducer from '../../store/reducers';

const middlewares = [
  routerMiddleware(history),
  thunkMiddleWare
];
const REDUX_DEVTOOLS_EXTENSION = (ENV.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer(history), REDUX_DEVTOOLS_EXTENSION);

export default store;
