import React from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';

export default class Pagination extends React.createElement {
	constructor(props) {
        super(props);
        this.state({
            page_comment: [],
        })
    }
    
    pages_number = (num) => {
        return num.map((e) => <li className="pages_number" onClick={this.props.next_comment} >e</li>)
    }

	render() {
		return (
			<div className="pagination_container">
				<ol className="numbers" />
			</div>
		);
	}
}
