import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import storage from 'lib/api/storage';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Login extends Component {

    handleSignIn = async () => {
        const { AuthActions, UserActions, history, form } = this.props;
        const { email, password } = form.toJS();

        try {
            await AuthActions.signIn({
                email,
                password
            });

            const loggedInfo = this.props.result.toJS();
            UserActions.setSignedInInfo(loggedInfo);
            history.push('/boards');
            storage.set('signedInInfo', loggedInfo);

        } catch(e) {
            if(e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                console.log(message)
            }
        }
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'signIn'
        });
    }

    render() {
        const { handleSignIn, handleChange } = this;

        return (
            <Container>
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
                            <Button onClick={handleSignIn} color="primary" variant="contained" fullWidth={true}>Sign in</Button>
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
        form: state.auth.getIn(['signIn', 'form']),
        result: state.auth.get('result')
    }),

    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(Login);