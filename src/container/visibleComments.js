import * as actions from '../actions';
import { connect } from 'react-redux';
import List from '../components/list/index';

const { add_comment, deltel_comment, find_comment } = actions

const mapStateToProps = (state) => {
	return {
		page_comment: state.page_comment
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		on_add_click: (payload) => {
			dispatch(add_comment(payload));
		},
		on_find: (payload) => {
			dispatch(find_comment(payload));
		},
		on_deltel: (payload) => {
			dispatch(deltel_comment(payload));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
