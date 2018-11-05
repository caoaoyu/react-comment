import * as actions from '../actions';
import { connect } from 'react-redux';
import Pagination from '../components/pagination/index';

const { on_pagination_page } = actions

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
	return {
		on_pagination_page: (payload) => {
			dispatch(on_pagination_page(payload));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
