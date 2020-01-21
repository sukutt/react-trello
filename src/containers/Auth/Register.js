import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import { bindActionCreators } from 'redux';
import {isEmail, isLength, isAlphanumeric} from 'validator';
import { Map } from 'immutable';

class Register extends Component {
    state = {
        error: Map({
            email: Map({
                valid: true,
                helperText: '잘못된 이메일 형식 입니다.'
            }),
            userId: Map({
                valid: true,
                helperText: '아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.'
            }),
            password: Map({
                valid: true,
                helperText: '비밀번호를 6자 이상 입력하세요.'
            }),
            passwordConfirm: Map({
                valid: true,
                helperText: '비밀번호가 일치하지 않습니다.'
            })
        })
    }

    setError = (key, isValid) => {
        const { error } = this.state;

        this.setState({
            error: error.setIn([key, 'valid'], isValid)
        })
    }

    validate = {
        email: (value) => {
            this.setError('email', isEmail(value) ?  true : false);
        },
        userId: (value) => {
            this.setError('userId', isAlphanumeric(value) && isLength(value, { min:4, max: 15 }) ?  true : false);
        },
        password: (value) => {
            this.setError('password', isLength(value, { min: 6, }) ?  true : false);
        },
        passwordConfirm: (value) => {
            this.setError('passwordConfirm', this.props.form.get('password') === value ?  true : false);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        const { AuthActions, form } = this.props;
        const { email, userId, password, passwordConfirm } = form.toJS();

        try {
            await AuthActions.signUp({
                email, userId, password 
            });

            window.location.href = '/';
        } catch(e) {
            if (e.response && (e.response.status === 409)) {
                const { key } = e.response.data;
                const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디입니다.';
                console.log(message);
            }
        }
    }

    checkEmailExists = async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if(this.props.exists.get('email')) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    checkUserIdExists = async (userId) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUserIdExists(userId);
            if(this.props.exists.get('userId')) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleChange = async (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        await AuthActions.changeInput({
            name,
            value,
            form: 'register',
        })

        const validation = this.validate[name](value);
        if(name.indexOf('password') > -1 || !validation) return; // 비밀번호 검증이거나, 검증 실패하면 여기서 마침

        // 이메일, 아이디 중복 확인
        const check = name === 'email' ? this.checkEmailExists : this.checkUserIdExists; // name 에 따라 이메일체크할지 아이디 체크 할지 결정
        check(value);
    }

    render() {
        const { handleChange, handleSubmit } = this;
        const {
            error
        } = this.state;

        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField 
                            error={error.getIn(['email', 'valid']) ? false : true }
                            helperText={error.getIn(['email', 'valid']) ? '' : ''}
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
                            helperText={error.getIn(['userId', 'valid']) ? '' : ''}
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
                            helperText={error.getIn(['password', 'valid']) ? '' : ''}
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
                            helperText={error.getIn(['passwordConfirm', 'valid']) ? '' : ''}
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
        form: state.auth.getIn(['register', 'form']),
        result: state.auth.get('result')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(Register);