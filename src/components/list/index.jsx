import React from 'react';
import Item from '../item/index';
import None from '../general/none/index';

export default class List extends React.Component{
	constructor(props) {
		super(props);
	}
	render() {
		const { comments } = this.props;
		return (
			<div className="comment_list">
				{comments.length > 0 ? <Item /> : <None />}
			</div>
		);
	}
}
