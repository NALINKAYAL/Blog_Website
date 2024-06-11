import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Checking user authentication status...');
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          console.log('User data:', userData);
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (!authStatus) {
      navigate('/');
    }
  }, [authStatus, navigate]);
  
  return !loading ? (
    <div className='min-h-screen flex flex-nowrap justify-around bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
       <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
