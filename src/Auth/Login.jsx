import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { Link } from 'react-router-dom';
import { loginRequest, RegLog } from '../Auth/authslice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
// import Loader2 from '../Common/Loader2';

const initialValue = {
    email: '',
    password: ''
}

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(initialValue);
    const { redirectTo, loading } = useSelector((state) => state?.Auth);
    const [error, setError] = useState({});

    // Make Password visibility 
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = (e) => {
        e.preventDefault()
        setPasswordShown(!passwordShown);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setError({ ...error, [name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let ErrorList = validation();
        setError(ErrorList);

        if (Object.keys(ErrorList).length === 0) {
            try {
                const response = await dispatch(loginRequest(user));

                if (response && response?.payload?.status === 200) {
                    setUser(initialValue);
                    navigate('/')
                } else {

                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const validation = () => {
        let error = {}
        if (!user.email) {
            error.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            error.email = 'Invalid email format';
        }
        if (!user.password) {
            error.password = 'Password is required';
        }
        return error;
    };

    // Redirect if get the token or not get the token 
    const redirectUser = () => {
        let token = localStorage.getItem("token")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

        if (token !== null && token !== undefined && token !== "") {
            isInLoginPage && navigate("/");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectTo])



    // If I not use this function then I can't go register page when token will be present in local storage

    const log = () => {
        dispatch(RegLog())
    }


    return (
        <Layout>
            <Container component="main" maxWidth="xs" style={{ marginTop: '150px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={user.email}
                            onChange={handleChange}
                            error={!!error.email}
                            helperText={error.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={passwordShown ? "text" : "password"}
                            id="password"
                            autoComplete="current-password"
                            value={user.password}
                            onChange={handleChange}
                            error={!!error.password}
                            helperText={error.password}
                        />
                        <br />
                        <Link onClick={togglePassword}>{passwordShown ? 'Hide Password' : 'Show Password'}</Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {/* {loading ? <Loader2 /> : 'Login'} */}
                            {loading ? 'Loading...' : 'Login'}

                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to="/register" variant="body2" onClick={log}>
                                    {"Don't have an account? Register Now"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Login;