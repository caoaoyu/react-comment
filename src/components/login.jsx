/**
 *
 *  登录界面
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './login.css';
import Modal from './general/modal/index';

const Cookies = require('../../util/cookies.min.js');
const account = Cookies.get('account');
const password = Cookies.get('password');
const cookies = account != undefined && password != undefined;
console.log(Modal);
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cookies,
            user: {},
            registered: false,
            visible: false,
            account: account != undefined ? account : '',
            password: password != undefined ? password : ''
        };

        this.handle_login = this.handle_login.bind(this);
        this.handle_visible = this.handle_visible.bind(this);
        this.cancel_registered = this.cancel_registered.bind(this);
        this.handle_registered = this.handle_registered.bind(this);
    }

    // 初始缓存登录
    componentDidMount() {
        if (this.state.account.length > 1 && this.state.password.length > 1) {
            this.props.fetch_user({
                account: this.state.account,
                password: this.state.password,
                cookie: true
            });
        }
    }

    // 初始登录验证
    componentWillReceiveProps(nextProps) {
        if (nextProps.user && nextProps.user.account) {
            this.props.history.push('/index');
        }

        console.log('---------', nextProps);
        if (nextProps.modal) {
            if (!this.state.cookies) {
                this.handle_visible();
            }
            this.setState({
                account: '',
                password: '',
                user: {},
                cookies: false
            });
        }
    }

    // 点击登录
    handle_login() {
        if (this.state.account.length < 1 || this.state.password.length < 1) {
            return false;
        }
        this.props.fetch_user({
            account: this.state.account,
            password: this.state.password
        });
    }

    // 输入账号
    handle_account(e, name) {
        this.setState({
            [name]: e.target.value
        });
    }

    // 注册账号
    cancel_registered() {
        this.setState({
            registered: !this.state.registered
        });
    }
    // 注册账号
    handle_registered() {
        if (this.state.account.length < 1 || this.state.password.length < 1) {
            return false;
        }
        this.props.fetch_registered({
            account: this.state.account,
            password: this.state.password
        });
    }

    handle_visible() {
        this.setState({
            visible: !this.state.visible
        });
    }

    handle_hide() {
        this.setState({
            visible: false
        });
        this.props.handle_error({
            account: '',
            password: '',
            user: {}
        });
    }

    // 渲染界面
    render() {
        const { modal } = this.props;
        return (
            <div className="container">
                {this.state.cookies ? (
                    <span>Loading</span>
                ) : (
                    <div className="login_account">
                        <h1>{this.state.registered ? '注册' : 'Login'}</h1>
                        <div className="login_user">
                            <span>📱</span>
                            <input
                                type="text"
                                maxLength="11"
                                className="username"
                                placeholder="手机号"
                                onChange={(e) => {
                                    this.handle_account(e, 'account');
                                }}
                                value={this.state.account || ''}
                            />
                        </div>
                        <div className="login_user">
                            <span>🔒</span>
                            <input
                                type="password"
                                maxLength="6"
                                className="password"
                                placeholder="密码"
                                onChange={(e) => {
                                    this.handle_account(e, 'password');
                                }}
                                value={this.state.password || ''}
                            />
                        </div>
                        <div className="login_btn_group">
                            <button className="login_btn" onClick={this.state.registered ? this.handle_registered : this.handle_login}>
                                {this.state.registered ? '确认' : '登录'}
                            </button>
                            <button className="login_btn" onClick={this.cancel_registered}>
                                {this.state.registered ? '取消' : '注册'}
                            </button>
                        </div>
                        <span className="pass_tip">初始 guest 密码 111111</span>
                    </div>
                )}
                <Modal
                    visible={this.state.visible}
                    handle_hide={() => {
                        this.handle_hide();
                    }}
                    context={modal ? modal.context : false}
                    title={modal ? modal.title : false}
                    btn={modal ? modal.btn : []}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        account: state.account,
        password: state.password,
        modal_type: state.modal_type,
        modal: state.modal,
        error: state.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_user: (payload) => {
            dispatch({ type: 'FETCH_USER', payload });
        },
        fetch_registered: (payload) => {
            dispatch({ type: 'FETCH_REGISTERED', payload });
        },
        handle_error: (payload) => {
            dispatch({ type: 'HANDLE_ERROR', payload });
        }
    };
};

Login.propTypes = {
    handle_error: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    fetch_user: PropTypes.func.isRequired,
    fetch_registered: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    fetch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
