import comments_reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import saga_comments from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(comments_reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga_comments);
// let store = createStore(comments_reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;