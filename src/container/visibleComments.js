import { connect } from 'react-redux';
import List from '../components/list/index';

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        on_find: (payload) => dispatch({ type: 'FIND_COMMENT', payload }),
        fetch_delete: (payload) => dispatch({ type: 'DELTEL_FETCH_COMMENT', payload }),
        update_context: (payload) => dispatch({ type: 'UPDATE_COMMENT', payload }),
        reply_com: (payload) => dispatch({ type: 'REPLY_COMMENT', payload })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
