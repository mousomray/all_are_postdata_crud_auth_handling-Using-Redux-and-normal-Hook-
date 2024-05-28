import React from 'react'
import { useState, useEffect } from 'react';
import Layout from '../Common/Layout'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addproduct } from '../Allreducers/addslice';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Container, Avatar, Grid, CssBaseline, TextField, Button, Box, FormControlLabel, Checkbox, Paper } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
//  import Loader2 from '../Common/Loader2';

import { updateproduct } from "../Allreducers/editslice"; // Import updateproduct function 
import { single } from "../Allreducers/detailslice"; // Import Single product function 

const initialValue = {
    title: "",
    description: "",
    image: "",
}

const Updateproduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singledata } = useSelector((state) => state.Details);
    const [add, setAdd] = useState(initialValue);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const validation = () => {
        let error = {};

        if (!add.title) {
            error.title = 'Title is Required';
        }

        if (!add.description) {
            error.description = 'Description is Required';
        }



        return error;
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setAdd({ ...add, [name]: value });

        if (!value) {
            setError({ ...error, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is Required` });
        } else {
            setError({ ...error, [name]: '' });
        }
    };

    // Get product For Single Value start
    const getProduct = async () => {
        try {
            const response = await dispatch(single(id));
            const reg = {
                title: response?.payload?.title,
                description: response?.payload?.description,
                image: response?.payload?.image,
            };
            setAdd(reg);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);
    // Get product For Single Value end

    const SubmitInfo = async (e) => {
        e.preventDefault();
        setLoading(true);

        const ErrorList = validation();
        setError(ErrorList);

        if (Object.keys(ErrorList).length === 0) {
            const formData = new FormData();
            formData.append("id", id);
            formData.append('title', add.title);
            formData.append('description', add.description);
            formData.append('image', image);

            try {
                const response = await dispatch(updateproduct(formData));
                console.log("My Edit Response is ", response);
                if (response && response?.payload?.status === 200) {
                    navigate('/showproduct')
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    };

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
                            Update Product
                        </Typography>
                        <Box component="form" onSubmit={SubmitInfo} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="title"
                                label="Title"
                                name="title"
                                type="text"
                                autoFocus
                                value={add.title}
                                onChange={postUserData}
                                error={!!error.title}
                                helperText={error.title}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                type="text"
                                autoFocus
                                value={add.description}
                                onChange={postUserData}
                                error={!!error.description}
                                helperText={error.description}
                            />



                            {/*This form section is for the submit image*/}
                            <div style={{ marginBottom: '20px' }}>
                                <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                                {/*Image Area Start*/}
                                {image !== "" &&
                                    image !== undefined &&
                                    image !== null ? (
                                    <img
                                        height="180px"
                                        src={URL.createObjectURL(image)}
                                        alt=""
                                        className="upload-img"
                                    />
                                ) : (
                                    <>
                                        {image === "" ? (
                                            <img
                                                height="180px"
                                                src={image}
                                                alt=""
                                                className="upload-img"
                                            />
                                        ) : (
                                            <img
                                                height="180px"
                                                src={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${singledata?.image}`}
                                                alt=""
                                                className="upload-img"
                                            />
                                        )}
                                    </>
                                )}

                            </div>
                            {/*Image area end*/}
                            

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                {/* {loading ? <Loader2 /> : 'Register'} */}
                                {loading ? 'Loading...' : 'Update'}

                            </Button>

                        </Box>
                    </Paper>
                </Container>
            </Layout>
        </>
    )
}

export default Updateproduct