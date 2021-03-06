import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import storage from 'lib/storage';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Map } from 'immutable';
import { GoogleLogin } from 'react-google-login';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    btnGoogle: {
        width: '100%',
        boxSizing: 'border-box',
        margin: 0,
        outline: 0,
        position: 'relative',
        verticalAlign: 'middle',
        justifyContent: 'center'
    },
});

class Login extends Component {
    state = {
        form: Map({
            email: '',
            password: '',
        }),
        alert: Map({
            open: false,
            message: ''
        }),
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { AuthActions, UserActions, history } = this.props;
        const { form } = this.state;
        const { email, password } = form.toJS();

        try {
            await AuthActions.signIn({
                email,
                password
            });

            const signedInInfo = this.props.result.toJS();
            storage.set('signedInInfo', signedInInfo);
            UserActions.setSignedInInfo(signedInInfo);

            history.push(`/${signedInInfo.userId}/boards`);
        } catch(e) {
            this.setState({
                alert: Map({
                    open: true,
                    message: 'Incorrect email or password'
                })
            })
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { form } = this.state;

        this.setState({
            form: form.set(name, value)
        });
    }

    handleAlertClose = () => {
        this.setState({
            alert: Map({
                open: false,
                message: ''
            })
        })
    }

    handleGoogleLogin = async (res) => {
        const { AuthActions, UserActions, history } = this.props;
        const { email, name } = res.profileObj;

        try {
            await AuthActions.signInWithOAuth({
                userId: name,
                email,
            });

            const signedInInfo = this.props.result.toJS();
            storage.set('signedInInfo', signedInInfo);
            UserActions.setSignedInInfo(signedInInfo);

            history.push(`/${signedInInfo.userId}/boards`);
        } catch(e) {
            this.setState({
                alert: Map({
                    open: true,
                    message: 'Incorrect email or password'
                })
            })
        }
    }

    render() {
        const {
            classes
        } = this.props;

        const {
            handleChange,
            handleSubmit,
            handleAlertClose,
            handleGoogleLogin
        } = this;

        const {
            alert
        } = this.state;

        return (
            <Container>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal:'center' }} open={alert.get('open')} autoHideDuration={2000} onClose={handleAlertClose}>
                    <MuiAlert elevation={6} variant="filled" severity="error">
                        {alert.get('message')}
                    </MuiAlert>
                </Snackbar>
                <CssBaseline />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField 
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            onChange={handleChange}
                            autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="primary" variant="contained" fullWidth={true}>Sign in</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <GoogleLogin
                                buttonText='Sign in with Google'
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                onSuccess={result => handleGoogleLogin(result)}
                                onFailure={result => console.log(result)}
                                cookiePolicy={'single_host_origin'}
                                className={classes.btnGoogle}
                            />
                        </Grid>
                        <Grid container justify="flex-end">
                            <Link to="/auth/register" underline="always">Sign up</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        result: state.auth.get('result')
    }),

    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(withStyles(useStyles)(Login));