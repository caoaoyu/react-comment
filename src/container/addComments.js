import React from 'react'
import { connect } from 'react-redux'
import { add_comment } from '../actions'
import AddComment from '../components/add/index'

const mapStateToProps = (state) =>{
    return {
		ids: state.comments.length,
		comments: state.comments,
	};
}  

const mapDispatchToProps = (dispatch) => {
	return {
		on_add_click: (payload) => {
			dispatch(add_comment(payload));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment)