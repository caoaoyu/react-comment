import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.visible ? 'modal_show' : 'modal_hide'}>
                <div className="modal_mask" onClick={this.props.handle_hide} />
                <div className="modal_warp">
                    <p className={this.props.title ? "modal_header" : 'none_header'}>{this.props.title && this.props.title}</p>
                    {this.props.context && <p className="modal_body">{this.props.context}</p>}

                    <div className="modal_footer">
                        {this.props.btn &&
                            this.props.btn.map((e) => {
                                if (e == 'cancel') {
                                    return (
                                        <div className="modal_close" onClick={this.props.handle_hide}>
                                            取消
                                        </div>
                                    );
                                }

                                if (e == 'sure') {
                                    return (
                                        <div className="modal_sure" onClick={this.props.handle_delete}>
                                            确认
                                        </div>
                                    );
                                }
                                if (e == 'tip') {
                                    return (
                                        <div className="modal_sure" onClick={this.props.handle_hide}>
                                            知道了
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>
            </div>
        );
    }
}

Modal.prototypes = {
    handle_sure: PropTypes.func,
    handle_hide: PropTypes.func,
    handle_cancel: PropTypes.func,
    context: PropTypes.string,
    title: PropTypes.string,
    btn: PropTypes.array
};
