import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { check_token } from './Auth/authslice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import Addproduct from './Pages/Addproduct'
import Showproduct from './Pages/Showproduct'
import Details from './Pages/Details'
import Updateproduct from './Pages/Updateproduct'
import Dashboard from './Pages/Dashboard'

const App = () => {

  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  const private_routing = [
    {
      path: '/',
      component: <Addproduct />
    },
    {
      path: '/showproduct',
      component: <Showproduct />
    },
    {
      path: '/details/:id',
      component: <Details />
    },
    {
      path: '/updateproduct/:id',
      component: <Updateproduct />
    },
    {
      path: '/dashboard',
      component: <Dashboard />
    }
  ]

  const public_routing = [
    {
      path: '/login',
      component: <Login />
    },
    {
      path: '/register',
      component: <Register />
    }
  ]

  // This step is required for to stop page refreshing problem in logout button
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <ToastContainer />

      <Router>
        <Routes>
          {/*Private Routing Area */}
          {private_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
              </>
            )
          })}

          {/*Private Routing Area */}
          {public_routing?.map((routing) => {
            return (
              <>
                <Route path={routing?.path} element={routing?.component} />
              </>
            )
          })}
        </Routes>
      </Router>
    </>
  )
}

export default App
