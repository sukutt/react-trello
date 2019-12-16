import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import storage from 'lib/api/storage';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';

class Register extends Component {
    handleRegister = async () => {
        const { AuthActions, UserActions, form, history } = this.props;
        const { email, userId, password, passwordConfirm } = form.toJS();

        try {
            await AuthActions.signUp({
                email, userId, password 
            });

            const loggedInfo = this.props.result.toJS();
            storage.set('signedInInfo', loggedInfo);
            UserActions.setSignedInInfo(loggedInfo);
            // UserActions.setValidated(true);

            history.push('/');
        } catch(e) {
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                console.log(message);
            }
        }
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register',
        })
    }

    render() {
        const { handleChange, handleRegister } = this;

        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <form>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField 
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            autoFocus
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            name="userId"
                            variant="outlined"
                            required
                            fullWidth
                            id="userId"
                            label="User ID"
                            onChange={handleChange}
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
                            <TextField 
                            name="passwordConfirm"
                            variant="outlined"
                            required
                            fullWidth
                            id="passwordConfirm"
                            label="Password Confirm"
                            type="password"
                            onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleRegister} color="primary" variant="contained" fullWidth={true}>Sign up</Button>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Link to="/auth/login" underline="always">Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default connect(
    (state) => ({
        form: state.auth.getIn(['register', 'form']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Register);