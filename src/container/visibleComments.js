import * as actions from '../actions';
import { connect } from 'react-redux';
import List from '../components/list/index';

const get_comments = (list, filter) => {
	switch (filter) {
		case 'SHOW_Find':
			return list;
		case 'SHOW_ALL':
			return list;
		default:
			return list;
	}
};

const mapStateToProps = (state) => {
	return {
		comments: state.comments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		on_add_click: (payload) => {
			dispatch(actions.add_comment(payload));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
