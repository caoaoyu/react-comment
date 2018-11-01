import comments_reducer from './reducers';
import { ADD_COMMENT, FIND_COMMENT, CHANGE_COMMENT, DELTEL_COMMENT } from './actions';

const createStore = (reducer) => {
	let state;
	let listeners = [];
	const getState = () => state;
	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach((listener) => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter((l) => l !== listener);
		};
	};

	return { getState, dispatch, subscribe };
};


let store = createStore(comments_reducer);

export default store
