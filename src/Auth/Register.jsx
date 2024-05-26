import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../Common/Layout'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../Auth/authslice';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Avatar, Grid, CssBaseline, TextField, Button, Box, FormControlLabel, Checkbox, Paper } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
//  import Loader2 from '../Common/Loader2';

const initialValue = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    profile_pic: "",
}

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { redirectReg, loading } = useSelector((state) => state?.Auth);
    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState({});
    const [image, setImage] = useState(null);

    const validation = () => {
        let error = {};

        if (!user.first_name) {
            error.name = 'First name is Required';
        }

        if (!user.last_name) {
            error.name = 'Last name is Required';
        }

        if (!user.email) {
            error.email = 'Email is Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            error.email = 'Invalid Email';
        }

        if (!user.password) {
            error.password = 'Password is required';
        } else if (user.password.length < 8) {
            error.password = 'Password must be atleast 8 characters'
        }

        return error;
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (!value) {
            setError({ ...error, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is Required` });
        } else {
            setError({ ...error, [name]: '' });
        }
    };

    const SubmitInfo = async (e) => {
        e.preventDefault();
        const ErrorList = validation();
        setError(ErrorList);

        if (Object.keys(ErrorList).length === 0) {
            const formData = new FormData();
            formData.append('first_name', user.first_name);
            formData.append('last_name', user.last_name);
            formData.append('email', user.email);
            formData.append('password', user.password);
            formData.append('profile_pic', image);


            try {
                const response = await dispatch(registerUser(formData));


                if (response && response?.payload?.status === 200) {
                    setUser(initialValue);
                    setImage('');
                    navigate('/login')
                } else {

                }
            } catch (error) {
                console.log(error);
            }

        }
    };

    // For Redirect which is part of Authentication (Start) 
    const redirectUser = () => {
        const name = localStorage.getItem('name');
        const isInLoginPage = window.location.pathname.toLowerCase() === '/register';
        if (name !== null && name !== undefined && name !== '') {
            isInLoginPage && navigate('/login');
        }
    };

    useEffect(() => {
        redirectUser();
    }, [redirectReg]);
    // For Redirect which is part of Authentication (End) 

    return (
        <>
            <Layout>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={3} sx={{ padding: 4, marginTop: 15 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', margin: 'auto' }}>
                            <AppRegistrationIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
                            Register
                        </Typography>
                        <Box component="form" onSubmit={SubmitInfo} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                label="First name"
                                name="first_name"
                                type="text"
                                autoFocus
                                value={user.first_name}
                                onChange={postUserData}
                                error={!!error.first_name}
                                helperText={error.first_name}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="last_name"
                                label="Last name"
                                name="last_name"
                                type="text"
                                autoFocus
                                value={user.last_name}
                                onChange={postUserData}
                                error={!!error.last_name}
                                helperText={error.last_name}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                value={user.email}
                                onChange={postUserData}
                                error={!!error.email}
                                helperText={error.email}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={user.password}
                                onChange={postUserData}
                                error={!!error.password}
                                helperText={error.password}
                            />

                            {/*This form section is for the submit image*/}
                            <div style={{ marginBottom: '20px' }}>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                {image !== "" && image !== undefined && image !== null ? (
                                    <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                                ) : (
                                    <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                                )}
                            </div>
                            {/*Image area end*/}

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                {/* {loading ? <Loader2 /> : 'Register'} */}
                                {loading ? 'Loading...' : 'Register'}

                            </Button>
                        </Box>
                        <Grid container justifyContent="flex-end">
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        Already have an account? Login
                                    </Link>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Paper>
                </Container>
            </Layout>
        </>
    )
}

export default Register