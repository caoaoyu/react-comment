import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddComment from '../container/addComments';
import VisibleComments from '../container/visibleComments';
import SettingPages from '../container/settingPages';
import SelectComment from '../container/selectContainer';
import Search from '../components/search/index';
import './index.css';
import Modal from './general/modal';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.handle_hide = this.handle_hide.bind(this);
    }

    componentWillMount() {
        if (!this.props.user.account) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        this.props.fetch_comments();
    }

    componentWillReceiveProps(nextProps) {
        console.log('---------', nextProps);
        if (nextProps.modal) {
            this.setState({
                visible: true
            });
        }
    }
    handle_hide() {
        this.setState({
            visible: false
        });
        this.props.handle_error();
    }

    render() {
        const { modal } = this.props;
        return (
            <div className="container">
                <Search />
                <AddComment />
                <SelectComment />
                <VisibleComments />
                <SettingPages />
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
