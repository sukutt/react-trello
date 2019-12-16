import { connect } from 'react-redux';
import App from '../components/App';
import { reorder } from '../store/modules/Lists';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    // onReorder: (params) => dispatch(reorder(params)),
});

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer;