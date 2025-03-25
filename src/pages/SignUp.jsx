import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../DB/supabaseClient";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("All fields are required.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { name }
      },
    });
    setLoading(false);

    if (error) {
      console.error("Signup error:", error.message);
      setMessage(error.message);
      return;
    }

    setMessage("Account created successfully! Check your email for confirmation.");

    setTimeout(() => navigate("/"), 4000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="email"
          name="email"
          placeholder="youremail@site.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        {message && (
          <p style={{ color: message.includes("successfully") ? "green" : "red", marginTop: "10px" }}>
            {message}
          </p>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Join"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
