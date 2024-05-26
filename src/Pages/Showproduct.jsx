import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { show } from '../Allreducers/showslice';
import { deleteproduct } from '../Allreducers/deleteslice'
import { Button } from '@mui/material';
import Layout from '../Common/Layout';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Showproduct = () => {
    const dispatch = useDispatch();
    const { showdata, loading } = useSelector((state) => state.Show);


    useEffect(() => {
        dispatch(show());
    }, []);


    // Make Handle For Delete
    const handleDelete = async (id) => {
        await dispatch(deleteproduct(id))
        dispatch(show());
    }


    if (loading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )
    }



    return (
        <>
            <Layout>

                <div className='container mt-5'>
                    <h1 className='mb-5' style={{ textAlign: 'center' }}>All products</h1>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {showdata.map((value) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
                                    <Card sx={{
                                        maxWidth: 345,
                                        border: '1px solid #E31C25',
                                        borderRadius: '10px',
                                        overflow: 'hidden',
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="350"
                                                image={`https://wtsacademy.dedicateddevelopers.us/uploads/product/${value?.image}`}
                                                alt="trainer"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {value?.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActionArea>


                                            <Button
                                                onClick={() => handleDelete(value._id)}
                                            >
                                                Delete
                                            </Button>


                                            <Link to={`/details/${value._id}`}>
                                                <Button size="small" color="primary">
                                                    Details
                                                </Button>
                                            </Link>
                                            <Link to={`/updateproduct/${value._id}`}>
                                                <Button size="small" color="primary">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </div>
            </Layout>
        </>
    );
};

export default Showproduct;