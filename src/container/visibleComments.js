import { connect } from 'react-redux';
import List from '../components/list/index';

const mapStateToProps = (state) => {
	return {
		page_comment: state.page_comment,
		select_comments: state.select_comments,
		comments: state.comments,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		on_find: (payload) => {
			dispatch({type: 'FIND_COMMENT', payload});
		},
		fetch_delete: (payload) => {
			dispatch({type: 'DELTEL_FETCH_COMMENT', payload});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
