import { connect } from 'react-redux';
import { show_del, show_not_del, show_all } from '../actions';
import SelectComment from '../components/select/index';

const mapStateToProps = (state) => {
	const { select_active, comments, select_comments, one_max } = state;
	return {
		one_max,
		select_active,
		comments,
		select_comments
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		on_show_all: (payload) => {
			dispatch(show_all(payload));
		},
		on_show_del: (payload) => {
			dispatch(show_del(payload));
		},
		on_show_not: (payload) => {
			dispatch(show_not_del(payload));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectComment);
