import { connect } from 'react-redux'
import { SHOW_ALL, SHOW_DELETEL, SHOW_NOT_DELETEL  } from '../actions'
import SelectComment from '../components/select/index'

const mapStateToProps = (state) =>{
    return {
		ids: state.comments.length,
		pages_nums: state.pages_nums,
		one_max: state.one_max,
	};
}  

const mapDispatchToProps = (dispatch) => {
	return {
		on_show_all: () => {
			dispatch(SHOW_ALL);
		},
		on_show_del: (payload) => {
			dispatch(SHOW_DELETEL);
		}
		,
		on_show_not: (payload) => {
			dispatch(SHOW_NOT_DELETEL);
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectComment)