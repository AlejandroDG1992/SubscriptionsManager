import { useState } from "react";
import React from "react";
import { supabase } from "../DB/supabaseClient";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [tryMessage, setTryMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      user_metadata: { name: name },
    });

    if (error) {
      console.error("Error sending Login Data:", error.message);
      setTryMessage(error.message);
    } else {
      console.log("Login Data send to:", data);
      setTryMessage("");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="name"
          name="name"
          id=""
          placeholder="Your name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          required
          type="email"
          name="email"
          id=""
          placeholder="youremail@site.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <br />
        <br />
        <input
          required
          type="password"
          name="password"
          id=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <br />
        {tryMessage && (
          <p style={{ color: "red", marginTop: "10px" }}> {tryMessage}</p>
        )}

        <button>Join</button>
      </form>
    </div>
  );
}

export default SignUp;
