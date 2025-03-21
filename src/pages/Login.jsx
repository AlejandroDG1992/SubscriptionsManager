import { useEffect, useState } from "react";
import { supabase } from "../DB/supabaseClient";
import { Link, useNavigate } from "react-router";
import { Button, ButtonGroup } from "@heroui/button";
import { Input } from "@heroui/input";
import "../App.css";

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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          isClearable
          variant="bordered"
          className="max-w-xs"
          label="Email"
          placeholder="youremail@site.com"
          type="email"
          value={email}
          name="email"
          isRequired
          onChange={(e) => setEmail(e.target.value)}
          onClear={() => console.log("input cleared")}
        />
        <br />
        <br />

        <Input
          className="max-w-xs"
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && (
          <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
        )}
        <br />
        <br />
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <br />
      <p>
        Don't have an account? <br />
        <Link to="/SignUp">Sign Up!</Link>
      </p>
    </div>
  );
}

export default Login;
