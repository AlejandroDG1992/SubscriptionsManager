import { useState } from "react";
import { supabase } from "../DB/supabaseClient";
import { Link, useNavigate } from "react-router";
// import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Email and password are required");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      console.error("Login error:", error.message);
      setErrorMessage("The username or password is incorrect.");
      return;
    }

    console.log("Logged in:", data);
    navigate("/");
  };

  return (
    <div className="bg-[#fff] border-2 border-[#EAEBED] dark:border-gray-700 rounded-lg p-4 max-w-md mx-auto mt-10 dark:bg-gradient-to-r from-slate-900 to-slate-800">
      <form onSubmit={handleSubmit}>
        <h1 className="text-4xl mb-4 dark:text-white text-left">Sign in</h1>
        <div className="mb-8 text-gray-500 text-left">
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@site.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-900 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
        <div className="mb-8 text-gray-500 text-left">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-900 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
        <button className="text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <br />
      <p className="dark:text-white">
        Don't have an account? 
        <span className="font-bold"><Link to="/SignUp"> Sign Up!</Link></span>
      </p>
    </div>
  );
}

export default Login;
