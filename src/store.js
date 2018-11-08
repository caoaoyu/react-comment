import comments_reducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import saga_comments from '../sagas/index';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(comments_reducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(saga_comments);

export default store;