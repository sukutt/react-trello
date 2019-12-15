import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            name="userName"
                            variant="outlined"
                            required
                            fullWidth
                            id="userName"
                            label="ID"
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
                            <TextField 
                            name="passwordConfirm"
                            variant="outlined"
                            required
                            fullWidth
                            id="passwordConfirm"
                            label="Password Confirm"
                            type="password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" color="primary" variant="contained" fullWidth="true">Sign up</Button>
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

export default Register;