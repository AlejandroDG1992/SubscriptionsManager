import { useState } from "react";
import { supabase } from "../DB/supabaseClient";
import { Link } from "react-router";
import "../App.css";
import SignUp from './SignUp'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!email || !password)
        {
        setErrorMessage("Email and password are required")
        return
    }

    if (error) {
      console.error("Error sending Login Data:", error.message);
      setErrorMessage("The user name or passwords is incorrect.")
    } else {
      console.log("Login Data send to:", data);
      setErrorMessage("")
    }
  };

  return (
    <div>
      <h2>Subscription Manager</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id=""
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        {errorMessage && ( <p style={{color:"red", marginTop: "10px"}}> {errorMessage}</p> )}
        <br />
        <br />
        <button>Login</button>
      </form>
      <br />
      <p>
        Don't have an account?
        <Link to="/SignUp">¿No tienes cuenta? Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;
