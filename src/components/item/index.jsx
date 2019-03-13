import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import cs from 'classnames';
import { timeToDate } from '../../../util/index';
import Pop from '../general/pop/index';

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_pop: false,
            edit_context: '',
            max: 60,
            edit: false,
            replay_edit: false,
        };
        this.handle_pop = this.handle_pop.bind(this);
        this.handle_hide = this.handle_hide.bind(this);
        this.handle_delete = this.handle_delete.bind(this);
        this.set_context = this.set_context.bind(this);
        this.handle_edit_sure = this.handle_edit_sure.bind(this);
        this.item_status = this.item_status.bind(this);
    }

    handle_pop() {
        this.setState({ show_pop: true });
    }

    handle_hide() {
        this.setState({ show_pop: false });
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
        if (this.state.replay_edit) {
            this.props.data.reply.push({
                context,
                name: this.props.data.user.name,
                time: new Date().getTime().toString()
            });
            const cond = {
                id,
                reply: this.props.data.reply
            };
            this.props.reply_com(cond);
            this.setState({
                edit: false,
                replay_edit: false
            });
        } else {
            this.props.update_context({ context, id });
            this.setState({
                edit: false
            });
        }
    }

    item_status(state) {
        if (state == 1) {
            return (
                <div>
                    <span
                        className="icon_span_red"
                        onClick={() => {
                            this.setState({
                                replay_edit: true,
                                edit: true
                            });
                        }}
                    >
                        {this.state.replay_edit ? '' : '回复'}
                    </span>
                    <span
                        className="icon_span_red"
                        onClick={() => {
                            this.setState({
                                edit: !this.state.edit,
                                show_pop: false
                            });
                        }}
                    >
                        {this.state.edit ? '取消' : '编辑'}
                    </span>
                    <span className="icon_span_red" onClick={this.handle_pop}>
                        {this.state.edit ? '' : '删除'}
                    </span>
                </div>
            );
        }
    }

    item_msg(state, data) {
        if (state.edit) {
            return (
                <div className="comm_item">
                    <textarea
                        className="edit_comment"
                        value={state.edit_context}
                        onChange={(e) => {
                            this.set_context(e.target.value);
                        }}
                    />
                    <div className="opticton_comment">
                        <span className="icon_span_green" onClick={this.handle_edit_sure}>
                            确认
                        </span>
                        {this.item_status(data.state)}
                    </div>
                </div>
            );
        } else {
            return (
                <blockquote>
                    <div className="comm_item">
                        <p>{data.context}</p>
                        <div className="opticton_comment">
                            <span className="comment_time">{timeToDate(Number(data.create_time))}</span>
                            {this.item_status(data.state)}
                        </div>
                    </div>
                    {this.item_reply()}
                </blockquote>
            );
        }
    }

    item_reply() {
        return (
            <div className="comment_reply">
                {this.props.data.reply.map((e, i) => {
                    return (
                        <div className="reply_item" key={`reply_item_${i}`}>
                            <p>{e.context}</p>
                            <span className="reply_user">
                                来自: {e.name} - {timeToDate(Number(e.time))}
                            </span>
                        </div>
                    );
                })}
            </div>
        );
    }
    render() {
        const { data } = this.props;
        return (
            <div className={cs({ show_comment: true, show_comment_delete: data.state === 2 })}>
                {this.item_msg(this.state, data)}
                {this.state.show_pop ? (
                    <Pop
                        handle_hide={this.handle_hide}
                        handle_delete={() => {
                            this.handle_delete(data.id);
                        }}
                        context="确定删除吗"
                    />
                ) : null}
            </div>
        );
    }
}

Item.prototypes = {
    comments: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired,
    fetch_delete: PropTypes.func.isRequired,
    update_context: PropTypes.func.isRequired,
    reply_com: PropTypes.func.isRequired
};

export default Item;
