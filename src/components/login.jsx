import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './login.css';
import { createHistory } from 'history';
const Cookies = require('../../util/cookies.min.js');

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accounts: '122334',
			password: '123456',
			cookies: false,
			info: {}
		};

		this.handle_login = this.handle_login.bind(this);
		this.handle_registered = this.handle_registered.bind(this);
	}

	componentWillMount() {
		const accounts = Cookies.get('accounts');
		const password = Cookies.get('password');
		if (accounts != undefined && password != undefined) {
			this.setState({
				cookies: { accounts, password }
			});
			this.handle_login();
		}
	}

	handle_login() {
		if (this.state.accounts && this.state.password) {
			this.props.fetch_user({
				accounts: this.state.accounts,
				password: this.state.password
			});
		} else {
			return false;
		}
	}

	handle_account(e, name) {
		this.setState({
			[name]: e.target.value
		});
	}

	handle_registered() {}
	render() {
		return (
			<div className="container">
				{this.state.cookies ? (
					<span>Loading</span>
				) : (
					<div className="login_accounts">
						<h1>Login</h1>
						<div className="login_user">
							<span>📱</span>
							<input
								type="text"
								maxLength="11"
								className="username"
								placeholder="手机号"
								onChange={(e) => {
									this.handle_account(e, 'accounts');
								}}
								value={this.state.accounts || '1111111'}
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
								value={this.state.password || '123456'}
							/>
						</div>
						<div className="login_btn_group">
							<button className="login_btn" onClick={this.handle_login}>
								登录
							</button>
							<button className="login_btn" onClick={this.handle_registered}>
								注册
							</button>
						</div>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_user: (payload) => {
			dispatch({ type: 'FETCH_USER', payload });
		}
	};
};

Login.propTypes = {
	fetch_user: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	fetch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
