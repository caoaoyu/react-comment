import React from 'react';
import List from '../components/list/index';
import './index.css';
import store from '../store';
import { ADD_COMMENT, FIND_COMMENT, CHANGE_COMMENT, DELTEL_COMMENT } from '../actions';


export default class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			comments: [],
		}
	}

	componentDidMount() {
		var list = localStorage.getItem('comments');
		if(list) {this.setState({comments: JSON.parse(list)})};
	}

	render() {
		const add_click= () => {
			console.log('add',this.props)
			store.dispatch({ type: 'ADD_COMMENT', payload: {text: 'text add', value: 1}});
			console.log(store.getState(), this.state)
		}
		return (
			<div className="container" >
				<div className="entry" contentEditable="true" />
				<button className="add_comments" type="defult" onClick={add_click} >留言</button>
				<List comments={this.state.comments}/>
			</div>
		);
	}
}
