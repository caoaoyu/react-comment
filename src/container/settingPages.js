import * as actions from '../actions';
import { connect } from 'react-redux';
import Pagination from '../components/pagination/index';

const { next_page, previous_page } = actions

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
	return {
		on_next_page: (payload) => {
			dispatch(next_page(payload));
		},
		on_previous_page: (payload) => {
			dispatch(previous_page(payload));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
