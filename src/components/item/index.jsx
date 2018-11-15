import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import cs from 'classnames';
import { timeToDate } from '../../../util/index';
import Modal from '../general/modal/index';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_modal: false,
            edit_context: '',
            max: 60,
            edit: false
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handle_hide = this.handle_hide.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
        this.set_context = this.set_context.bind(this);
        this.handle_edit_sure = this.handle_edit_sure.bind(this);
    }

    handle_modal() {
        this.setState({ show_modal: true });
    }

    handle_hide() {
        this.setState({ show_modal: false });
    }

    handle_delete(id) {
        this.handle_hide();
        this.props.fetch_delete(id);
        return;
    }

    set_context(vul) {
        const { max } = this.state;
        this.setState({
            edit_context: vul.length < max ? vul : this.state.edit_context,
            exceed: vul.length > max
        });
    }

    handle_edit_sure() {
        const context = this.state.edit_context;
        const id = this.props.data.id;
        // var character = String.fromCharCode(code);
        // var txt = new RegExp(/["'<>%;)(&+]/);
        if (context.length < 1) return;
        this.props.update_context({ context, id });
        this.setState({
            edit: false
        });
    }

    render() {
        const { data } = this.props;

        return (
            <div className={cs({ show_comment: true, show_comment_delete: data.state === 2 })}>
                {this.state.edit ? <textarea className="edit_comment" value={this.state.edit_context} onChange={(e) => this.set_context(e.target.value)} /> : <p>{data.context}</p>}
                <div className="opticton_comment">
                    {this.state.edit ? (
                        <span className="icon_span_green" onClick={this.handle_edit_sure}>
                            确认
                        </span>
                    ) : (
                        <span className="comment_time">{timeToDate(Number(data.create_time))}</span>
                    )}
                    {data.state === 1 ? (
                        <span className="icon_span_red" onClick={() => this.setState({ edit: !this.state.edit, show_modal: false })}>
                            {this.state.edit ? '取消' : '编辑'}
                        </span>
                    ) : null}
                    {data.state === 1 ? (
                        <span className="icon_span_red" onClick={this.handle_modal}>
                            {this.state.edit ? '' : '删除'}
                        </span>
                    ) : null}
                </div>
                {this.state.show_modal ? <Modal handle_hide={this.handle_hide} handle_delete={() => this.handle_delete(data.id)} context="确定删除吗" /> : null}
            </div>
        );
    }
}

Item.prototypes = {
    comments: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    fetch_delete: PropTypes.func.isRequired,
    update_context: PropTypes.func.isRequired
};

export default Item;
