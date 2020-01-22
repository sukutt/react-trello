import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import { Map } from 'immutable';
import debounce from 'lodash/debounce';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class Register extends Component {
    state = {
        form: Map({
            email: '',
            userId: '',
            password: '',
            passwordConfirm: '',
        }),
        alert: Map({
            open: false,
            message: ''
        }),
        error: Map({
            email: Map({
                valid: true,
                helperText: 'Invalid email format'
            }),
            userId: Map({
                valid: true,
                helperText: 'The ID must be 4-15 letters or numbers'
            }),
            password: Map({
                valid: true,
                helperText: 'Passwords must be at least 6 characters'
            }),
            passwordConfirm: Map({
                valid: true,
                helperText: 'Password is not matching'
            })
        })
    }

    setError = ({key, valid, helperText}) => {
        const { error } = this.state;

        this.setState({
            error: error.set(key, {
                valid,
                helperText
            })
        })
    }

    validate = {
        email: (value) => {
            const valid = isEmail(value);
            this.setError({
                key: 'email',
                valid,
                helperText: 'Invalid email format'
            });

            return valid;
        },
        userId: (value) => {
            const valid = isAlphanumeric(value) && isLength(value, { min:4, max: 15 });
            this.setError({
                key: 'userId', 
                valid,
                helperText: 'The ID must be 4-15 letters or numbers'
            });

            return valid;
        },
        password: (value) => {
            const valid = isLength(value, { min: 6, });

            this.setError({
                key: 'password', 
                valid,
                helperText: 'Passwords must be at least 6 characters'
            })

            return valid;
        },
        passwordConfirm: (value) => {
            const { form } = this.state;
            const valid = form.get('password') === value;

            this.setError({
                key: 'passwordConfirm', 
                valid,
                helperText: 'Password is not matching'
            });

            return valid;
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { AuthActions } = this.props;
        const { error, alert, form } = this.state;
        const { email, userId, password, passwordConfirm } = form.toJS();

        if(!error.getIn(['email', 'valid'])
        || !error.getIn(['userId', 'valid'])
        || !error.getIn(['password', 'valid'])
        || !error.getIn(['passwordConfirm', 'valid'])) {
            return;
        }

        if (password !== passwordConfirm) {
            this.setError({
                key: 'passwordConfirm',
                valid: false,
                helperText: 'Password is not matching'
            });

            return;
        }

        try {
            await AuthActions.signUp({
                email, userId, password
            });

            window.location.href = '/';
        } catch(e) {
            if (e.response && (e.response.status === 409)) {
                const { key } = e.response.data;
                const message = key === 'email' ? 'This email already exists' : 'This id already exists';
                this.setState({
                    alert: alert
                           .set('open', true)
                           .set('message', message)
                })
            }
        }
    }

    checkEmailExists = debounce(async (email) => {
        const { AuthActions } = this.props;
        const { error } = this.state;
        try {
            await AuthActions.checkEmailExists(email);
            if(this.props.exists.get('email')) {
                this.setState({
                    error: error.set('email', {
                        valid: false,
                        helperText: 'This email already exists'
                    })
                })
            }
        } catch (e) {
            console.log(e);
        }
    }, 300)

    checkUserIdExists = debounce(async (userId) => {
        const { AuthActions } = this.props;
        const { error } = this.state;

        try {
            await AuthActions.checkUserIdExists(userId);
            if(this.props.exists.get('userId')) {
                this.setState({
                    error: error.set('userId', {
                        valid: false,
                        helperText: 'This id already exists',
                    })
                })
            } 
        } catch (e) {
            console.log(e);
        }
    }, 300)

    handleChange = (e) => {
        const { name, value } = e.target;
        const { form } = this.state;

        this.setState({
            form: form.set(name, value)
        });

        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

        // 이메일, 아이디 중복 확인
        const check = name === 'email' ? this.checkEmailExists : this.checkUserIdExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);
    }

    handleAlertClose = () => {
        this.setState({
            alert: Map({
                open: false,
                message: ''
            })
        })
    }

    render() {
        const {
            handleChange,
            handleSubmit,
            handleAlertClose
         } = this;

        const {
            error,
            alert,
        } = this.state;

        return (
            <Container maxWidth="xs">
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
                            error={error.getIn(['email', 'valid']) ? false : true }
                            helperText={error.getIn(['email', 'valid']) ? '' : error.getIn(['email', 'helperText'])}
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
                            error={error.getIn(['userId', 'valid']) ? false : true }
                            helperText={error.getIn(['userId', 'valid']) ? '' : error.getIn(['userId', 'helperText'])}
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
                            error={error.getIn(['password', 'valid']) ? false : true }
                            helperText={error.getIn(['password', 'valid']) ? '' : error.getIn(['password', 'helperText'])}
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
                            error={error.getIn(['passwordConfirm', 'valid']) ? false : true }
                            helperText={error.getIn(['passwordConfirm', 'valid']) ? '' : error.getIn(['passwordConfirm', 'helperText'])}
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
                            <Button type='submit' color="primary" variant="contained" fullWidth={true}>Sign up</Button>
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
        result: state.auth.get('result'),
        exists: state.auth.getIn(['signUp', 'exists'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(Register);