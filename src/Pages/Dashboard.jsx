import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { profile } from '../Allreducers/profileslice'

const Dashboard = () => {

    const dispatch = useDispatch();
    const { profiledata, loading } = useSelector((state) => state.Profile);

    console.log("Fetchisaaas profile", profiledata);

    useEffect(() => {
        dispatch(profile());
    }, []);

    return (
        <>
            <Layout>

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            Dashboard
                        </div>
                        <div className="card-body">
                            <h5 className="card-title"><b>First Name : </b>{profiledata?.first_name}</h5>
                            <h5 className="card-title"><b>Last Name : </b>{profiledata?.last_name}</h5>
                            <h5 className="card-title"><b>Email : </b>{profiledata?.email}</h5>
                            <Link to="/" className="btn btn-primary">Back to Home</Link>
                        </div>
                        <div className="card-footer text-muted">
                            2 days ago
                        </div>
                    </div>
                </div>



            </Layout>
        </>
    )
}

export default Dashboard
