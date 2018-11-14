import { CHANGE_PAGE } from '../actions';
import { connect } from 'react-redux';
import Pagination from '../components/pagination/index';

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        on_pagination: (payload) => dispatch({ type: CHANGE_PAGE, payload })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
