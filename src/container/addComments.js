import React from 'react';
import { connect } from 'react-redux';
import AddComment from '../components/add/index';

const mapStateToProps = (state) => {
	return {
		ids: state.comments.length,
		comments: state.comments,
		now_page: state.now_page,
		page_comment: state.page_comment,
		one_max: state.one_max
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_add: (payload) => {
			dispatch({type:'FETCH_ADD_COMMENT', payload});
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
