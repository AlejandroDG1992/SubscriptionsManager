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
      <div className="flex flex-col min-h-screen"> {/* Flex container for sticky footer */}
        <header className="flex justify-center p-4 max-w-xl mx-auto mt-10">
          <img src={headerImage} alt="Header" className="object-fill" />
        </header>
        
        <div className="flex-grow">
          <Analytics />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/SignUp" element={<SignUp />} />
          </Routes>
        </div>
        
        <footer className="w-full px-4 py-2 text-xs text-black dark:text-white">
          <div>
            <span>In development by </span>
            <a
              href="https://portfolio-app-kohl-two.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
            >
              Alejandro Delgado
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
