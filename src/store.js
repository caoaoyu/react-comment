import comments_reducer from './reducers';
import { createStore } from 'redux'

let store = createStore(comments_reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
