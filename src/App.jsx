import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route, useNavigate, useLocation  } from 'react-router'
import Login from './pages/Login'
import ManagementPage from './pages/ManagementPage'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import {supabase} from './DB/supabaseClient'
import GradientBackground from './components/GradientBackground'


function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        if (location.pathname !== "/SignUp") {
          navigate("/Login");
        }
      } else {
        navigate("/");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <>
 <GradientBackground />
    <div className='background'>
      <Routes>
        <Route path="/UserPage" element = {<ManagementPage/>} />
        <Route path="/Login" element = {<Login/>} />
        <Route path="*" element = {<NotFound/>} />
        <Route path="/SignUp" element = {<SignUp/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
