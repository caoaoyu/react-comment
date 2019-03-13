import { call, put, takeEvery, takeLatest, take, select, all } from 'redux-saga/effects';
import * as Api from './serverFetch';
const err_modal = (name, e, modal_type, btn) => {
    return {
        modal: {
            name, // 类型作为页面判断条件
            btn: btn || [ 'tip' ], // Sure, Cancel
            context: e.message,
            title: false // false || text
        },
        modal_type: modal_type || 'Error' // Tip， Error，Success，
    };
};

function* fetch_user(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.fetch_user(action, state));
        yield put({ type: 'USER_INFO', payload });
    } catch (e) {
        console.log(e)
        console.log(err_modal('login', e))
        yield put({
            type: 'FETCH_ACTION',
            payload: err_modal('login', e)
        });
    }
}
function* fetch_registered(action) {
    const state = yield select();
    try {
        yield call(() => Api.fetch_registered(action, state));
        yield put({
            type: 'FETCH_ACTION',
            payload: err_modal('registered', { message: '注册账号成功' }, 'Tip')
        });
    } catch (e) {
        yield put({
            type: 'FETCH_ACTION',
            payload: err_modal('registered', e)
        });
    }
}
function* fetch_comments(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.fetch_comments(action, state));
        yield put({ type: 'GET_COMMENT', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('comment', e) });
    }
}

function* add_comments(action) {
    try {
        const payload = yield call(() => Api.add_comment(action.payload));
        yield put({ type: 'FETCH_COMMENT', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('add', e) });
    }
}

function* delete_comment(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.fetch_delete_comment(action.payload, state));
        yield put({ type: 'DELTEL_GET_COMMENT', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('del', e) });
    }
}

function* update_comment(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.update_comments(action.payload, state));
        yield put({ type: 'UPDATE_COMMENTS', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('update', e) });
    }
}
function* reply_comment(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.reply_comment(action.payload, state));
        yield put({ type: 'FETCH_COMMENT', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('reply', e) });
    }
}

function* find_comment(action) {
    const state = yield select();
    try {
        const payload = yield call(() => Api.find_comment(action.payload, state));
        yield put({ type: 'FIND_COMMENT_SUCCESS', payload });
    } catch (e) {
        yield put({ type: 'FETCH_ACTION', payload: err_modal('find', e) });
    }
}

function* saga_comments() {
    yield all([
        yield takeEvery('FIND_RESRT', fetch_comments),
        yield takeEvery('FETCH_REGISTERED', fetch_registered),
        yield takeEvery('UPDATE_COMMENT', update_comment),
        yield takeEvery('REPLY_COMMENT', reply_comment),
        yield takeEvery('CHANGE_PAGE', fetch_comments),
        yield takeEvery('FIND_COMMENT', find_comment),
        yield takeEvery('FETCH_COMMENT', fetch_comments),
        yield takeEvery('FETCH_ADD_COMMENT', add_comments),
        yield takeEvery('DELTEL_FETCH_COMMENT', delete_comment),
        yield takeEvery('SHOW_FETCH_COMMENTS', fetch_comments),
        yield takeEvery('FETCH_USER', fetch_user)
    ]);
}

export default saga_comments;
