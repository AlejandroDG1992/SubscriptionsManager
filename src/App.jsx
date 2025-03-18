import React, { useEffect } from 'react'
import './App.css'
import {Routes, Route, useNavigate  } from 'react-router'
import Login from './pages/Login'
import ManagementPage from './pages/ManagementPage'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import {supabase} from './DB/supabaseClient'
import GradientBackground from './components/GradientBackground'


function App() {
  const navigate = useNavigate()

  useEffect(() =>{
    supabase.auth.onAuthStateChange((event, session) =>{
    if (!session) {
      navigate('/login')
    } else {
      navigate('/')
    }
  })
  }
)

  return (
    <>
 <GradientBackground />
    <div className='background'>
   
      <Routes>
        <Route path="/" element = {<ManagementPage/>} />
        <Route path="/Login" element = {<Login/>} />
        <Route path="*" element = {<NotFound/>} />
        <Route path="/SignUp" element = {<SignUp/>} />
      </Routes>
    </div>
    </>
  )
}

export default App
