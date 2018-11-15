import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { general_classfly } from './model';

class SelectComment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { on_show, select_active } = this.props;
        return (
            <div className="select_container">
                <span className={select_active === 0 ? 'select_active_icon' : null} onClick={() => on_show(0)}>
                    全部
                </span>
                <span className={select_active === 1 ? 'select_active_icon' : null} onClick={() => on_show(1)}>
                    未删除
                </span>
                <span className={select_active === 2 ? 'select_active_icon' : null} onClick={() => on_show(2)}>
                    已删除
                </span>
            </div>
        );
    }
}

SelectComment.prototypes = {
    select_active: PropTypes.string.isRequired,
    on_show: PropTypes.func.isRequired
};

export default SelectComment;
