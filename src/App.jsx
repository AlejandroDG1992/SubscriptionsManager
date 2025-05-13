import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import { supabase } from "./DB/supabaseClient";
import headerImage from "./assets/SubscriptionsManagerLogo.png";
import footerImage from "./assets/LinkedinLogo.jpg";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!session && location.pathname !== "/SignUp") {
          navigate("/Login");
        } else if (session) {
          navigate("/");
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
    <div>
      <header className="flex justify-center p-4 max-w-xl mx-auto mt-10">
        <img src={headerImage} alt="Header"  className="object-fill"/>
      </header>
      <div>
        <Analytics />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/SignUp" element={<SignUp />} />
        </Routes>
      </div>
      <footer className="w-full flex justify-between items-center fixed bottom-0 left-0 text-xs">
        <div className="footer-logo">
          <span className="footer-text">
            In development by Alejandro Delgado
          </span>
          <a
            href="https://www.linkedin.com/in/alejandro-delgado-931287ab/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={footerImage} alt="Footer" className="footer-image"/>
          </a>
        </div>
      </footer>
    </div>
    </>
  );
}

export default App;
