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
        data: { name },
      },
    });
    setLoading(false);

    if (error) {
      console.error("Signup error:", error.message);
      setMessage(error.message);
      return;
    }

    setMessage(
      "Account created successfully! Check your email for confirmation."
    );

    setTimeout(() => navigate("/"), 4000);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-[#fff] border-2 border-[#EAEBED] dark:border-gray-700 rounded-lg p-4 max-w-md mx-auto mt-10 dark:bg-gradient-to-r from-slate-900 to-slate-800"
      >
        <h1 className="text-4xl mb-4 dark:text-white text-left">Sign in</h1>
        <div className="mb-8 text-gray-500 text-left">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-900 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black dark:border-gray-900 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {message && (
          <p
            style={{
              color: message.includes("successfully") ? "green" : "red",
              marginTop: "10px",
            }}
          >
            {message}
          </p>
        )}
        <button className="text-white dark:text-black bg-black dark:bg-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Join"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
