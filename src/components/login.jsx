import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './login.css';
const Cookies = require('../../util/cookies.min.js');

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			account: '',
			password: '',
			cookies: false,
			user: {}
		};

		this.handle_login = this.handle_login.bind(this);
		this.handle_registered = this.handle_registered.bind(this);
	}

	componentWillMount() {
		const account = Cookies.get('account');
		const password = Cookies.get('password');
		if (account != undefined && password != undefined) {
			const cookies = {
				account,
				password
			};
			this.setState({ cookies });
			this.props.fetch_user(cookies);
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.user && nextProps.user.account) {
			this.props.history.push('/index');
		}

		console.log('---------', nextProps.error)
		if(nextProps.error != 'false') {
			alert(nextProps.error)
			this.props.handle_error();
			
		}
		return false;
	}

	handle_login() {
		this.props.fetch_user({
			account: this.state.account,
			password: this.state.password
		});
	}

	handle_account(e, name) {
		this.setState({
			[name]: e.target.value
		});
	}

	handle_registered() {}
	render() {
		console.log(this.props.error)
		return (
			<div className="container">
				{this.state.cookies ? (
					<span>Loading</span>
				) : (
					<div className="login_account">
						<h1>Login</h1>
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
								defaultValue={this.state.account || ''}
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
								defaultValue={this.state.password || ''}
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
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetch_user: (payload) => {
			dispatch({ type: 'FETCH_USER', payload });
		},
		handle_error: () => {
			console.log('dispatch')
			dispatch({type: 'HANDLE_ERROR'})
		}
		
	};
};

Login.propTypes = {
	handle_error: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	fetch_user: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	fetch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
