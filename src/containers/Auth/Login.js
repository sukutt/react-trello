import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Login extends Component {
    handleLogin = () => {
        const {history} = this.props;
        history.push('/boards');
    }

    render() {
        const { handleLogin } = this;

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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleLogin} type="submit" color="primary" variant="contained" fullWidth="true">Sign in</Button>
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

export default Login;