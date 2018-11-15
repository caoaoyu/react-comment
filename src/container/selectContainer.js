import { connect } from 'react-redux';
import SelectComment from '../components/select/index';

const mapStateToProps = (state) => {
    const { select_active } = state;
    return {
        select_active
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        on_show: (payload) => {
            console.log(payload)
            dispatch({ type: 'SHOW_FETCH_COMMENTS', payload });
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectComment);
