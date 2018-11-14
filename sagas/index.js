import { call, put, takeEvery, takeLatest, take, select, all } from 'redux-saga/effects';
import * as Api from './serverFetch';

function* fetch_comments(action) {
	try {
		const payload = yield call(() => Api.fetch_comments(action));
		yield put({ type: 'GET_COMMENT', payload });
	} catch (e) {
		yield put({ type: 'FETCH_ACTION', payload: { message: e.message } });
	}
}

function* add_comments(action) {
	const state = yield select();
	try {
		const payload = yield call(() => Api.add_comment(action.payload, state));
		yield put({ type: 'FETCH_COMMENT', payload });
	} catch (e) {
		yield put({ type: 'FETCH_ACTION', payload: { message: e.message } });
	}
}

function* delete_comment(action) {
	const state = yield select();
	try {
		const payload = yield call(() => Api.fetch_delete_comment(action.payload, state));
		yield put({ type: 'DELTEL_COMMENT', payload });
	} catch (e) {
		yield put({ type: 'FETCH_ACTION', payload: { message: e.message } });
	}
}

function* saga_comments() {
	yield all([
		yield takeEvery('CHANGE_PAGE', fetch_comments),
		yield takeEvery('FETCH_COMMENT', fetch_comments),
		yield takeEvery('FETCH_ADD_COMMENT', add_comments),
		yield takeEvery('DELTEL_FETCH_COMMENT', delete_comment)
		
	]);
}

export default saga_comments;
