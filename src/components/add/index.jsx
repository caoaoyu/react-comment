import React from 'react';
import PropTypes from 'prop-types';
import { add_model } from './model';

class AddComment extends React.Component{
    constructor(props) {
        super(props);
        // on_add_click: props.func.isRequired,
        this.my_ref=React.createRef();
    }
    get_comment(param) {
        const text = param.current.innerText;
        console.log(this.props)
        if(text) {
            const comments = add_model(this.props.ids, text);
            this.props.on_add_click({comments});
        }
    }
    render(){
        return (
            <div className="add_container">
                <div className="entry" contentEditable="true" type="text" ref={this.my_ref} />
                <button className="add_comments" type="defult" onClick={() => this.get_comment(this.my_ref) }>
                    留言
                </button>
            </div>
        );
    }
};

AddComment.propTypes = {
    on_add_click: PropTypes.func.isRequired,
    ids: PropTypes.number.isRequired,
 };

export default AddComment;
