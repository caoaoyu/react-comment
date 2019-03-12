import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
const Chance = require('chance');
const chance = new Chance();

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vul: chance.string(),
            exceed: false,
            max: 60
        };

        this.handle_comment = this.handle_comment.bind(this);
        this.handle_change = this.handle_change.bind(this);
        this.handle_key_down = this.handle_key_down.bind(this);
        this.set_comment_value = this.set_comment_value.bind(this);
    }
    handle_comment(param) {
        if (this.state.vul.length > 0) {
            this.props.fetch_add({
                text: this.state.vul,
                id: JSON.parse(localStorage.getItem('user')).id
            });
            this.setState({
                vul: chance.string(),
                exceed: false
            });
        }
    }

    handle_change(e) {
        let text = e.target.value;
        this.set_comment_value(text);
    }

    handle_key_down(e) {
        if (e.keyCode === 8) {
            this.set_comment_value(e.target.value);
        }
    }

    set_comment_value(vul) {
        const { max } = this.state;
        if (vul.length > max) return this.setState({ vul: this.state.vul, exceed: true });
        this.setState({
            vul,
            exceed: false
        });
    }

    render() {
        const { vul, exceed } = this.state;
        return (
            <div className="add_container">
                <textarea className="entry" value={vul} onKeyDown={this.handle_key_down} onChange={this.handle_change} />
                <span className={cs({ max_numbers: true, exxceed_number: exceed })}>{vul.length} / 60</span>
                <button className="add_comments" type="defult" onClick={this.handle_comment}>
                    留言
                </button>
            </div>
        );
    }
}

AddComment.propTypes = {
    fetch_add: PropTypes.func.isRequired,
    ids: PropTypes.number.isRequired,
    comments: PropTypes.array.isRequired,
    now_page: PropTypes.number.isRequired,
    page_comment: PropTypes.array.isRequired,
    one_max: PropTypes.number.isRequired
};

export default AddComment;
