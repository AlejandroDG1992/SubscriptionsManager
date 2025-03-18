import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route, useNavigate, useLocation  } from 'react-router'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import {supabase} from './DB/supabaseClient'
import GradientBackground from './components/GradientBackground'
import headerImage from './assets/SubscriptionsManagerLogo.png'; // ✅ Importa la imagen correctamente


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
    <header className="header">
    <img src={headerImage} alt="Cabecera" className="header-image" />
      </header>
    <div className='background'>
      <Routes>
        <Route path="/" element = {<Home/>} />
        <Route path="/Login" element = {<Login/>} />
        <Route path="*" element = {<NotFound/>} />
        <Route path="/SignUp" element = {<SignUp/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
