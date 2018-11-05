import React from 'react'
import { connect } from 'react-redux'
import { add_comment } from '../actions'
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
		on_show_all: (payload) => {
			dispatch(add_comment(payload));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectComment)