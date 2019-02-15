import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComment from '../container/addComments';
import VisibleComments from '../container/visibleComments';
import SettingPages from '../container/settingPages';
import SelectComment from '../container/selectContainer';
import Search from '../components/search/index';
import './index.css';
class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if(!this.props.user.account) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.props.fetch_comments();
    }

    render() {
        return (
            <div className="container">
                <Search />
                <AddComment />
                <SelectComment />
                <VisibleComments />
                <SettingPages />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        one_max: state.one_max
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_comments: () => {
            dispatch({ type: 'FETCH_COMMENT' });
        }
    };
};

App.propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    one_max: PropTypes.number,
    fetch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
