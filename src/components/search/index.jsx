import React from 'react';
import PropTypes from 'prop-types';
import { FIND_COMMENT } from '../../actions';
import { connect } from 'react-redux';
import './index.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_text: ''
        };

        this.handle_show_input = this.handle_show_input.bind(this);
        this.handle_change = this.handle_change.bind(this);
    }

    handle_show_input() {
        this.state.is_text.length > 1 ? this.props.handle_search(this.state.is_text) : this.props.handle_all();
    }

    handle_change(e) {
        this.setState({
            is_text: e.target.value.length < 60 ? e.target.value : this.state.is_text
        });
    }

    render() {
        return (
            <div className="search_container">
                <input type="text" onChange={this.handle_change} value={this.state.is_text} />
                <span onClick={this.handle_show_input}>点击查询留言</span>
            </div>
        );
    }
}

// const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
    return {
        handle_search: (payload) => dispatch({ type: FIND_COMMENT, payload }),
        fetch_comments: () => dispatch({ type: 'FETCH_COMMENT' }),
        handle_all: () => dispatch({ type: 'FIND_RESRT' }),
    };
};

export default connect(null, mapDispatchToProps)(Search);
