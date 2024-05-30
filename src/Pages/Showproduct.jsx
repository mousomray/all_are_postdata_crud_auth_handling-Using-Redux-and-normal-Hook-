import React, { useState, useEffect } from 'react';
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
import Swal from 'sweetalert2'; // Import Sweet Alert 
import Pagination from '@mui/material/Pagination'; // Import Pagination

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Showproduct = () => {
    const dispatch = useDispatch();
    const { showdata, totalpage, loading } = useSelector((state) => state.Show);
    const [currentPage, setCurrentPage] = useState(1); // State For Pagination


    // Handle Make For Pagination 
    const handleOnChange = (e, pageno) => {
        setCurrentPage(pageno);
        dispatch(show({ page: pageno, perpage: 10 }));
    };

    useEffect(() => {
        dispatch(show());
    }, []);



    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this product!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deleteproduct(id));
            dispatch(show());
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your product has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)


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
                <div className='container' style={{ marginTop: '100px' }}>
                    <h1 className='mb-5' style={{ textAlign: 'center' }}>All products</h1>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {showdata.length !== 0 ? (
                                showdata.map((value) => (
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
                                                <Button onClick={() => handleDelete(value._id)}>
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
                                ))
                            )
                                :
                                (
                                    <>
                                        <p >No Data Found</p>
                                    </>
                                )}

                        </Grid>
                        <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                            <Grid justifyContent="center">
                                {showdata.length !== 0 ? (
                                    <Pagination
                                        count={totalpage}
                                        page={currentPage}
                                        onChange={handleOnChange}
                                        variant="outlined"
                                        shape="rounded"
                                    />

                                ) : (
                                    <>
                                    </>
                                )}
                            </Grid>
                        </Box>
                    </Box>
                </div>
            </Layout>
        </>
    );
};

export default Showproduct;
