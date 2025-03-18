import { useState } from "react";
import React from "react";
import { supabase } from "../DB/supabaseClient";

function SignUp () {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [tryMessage, setTryMessage] = useState("");
        const handleSubmit = async (e) => {
            e.preventDefault()
    
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
              });
              
              if (error) {
                console.error('Error sending Login Data:', error.message);
                setTryMessage(error.message)
              } else {
                console.log('Login Data send to:', data);
                setTryMessage("")
            }        
        }
    return(
        <div>
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
            <input type="email"
            name= "email"
            id="" 
            placeholder="youremail@site.com"
            onChange={(e) => setEmail(e.target.value)}>
            </input>
            <br/>
            <br/>
            <input type="password"
            name = "password"
            id = ""
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br/>
            <br/>

            {tryMessage && ( <p style={{color:"red", marginTop: "10px"}}> {tryMessage}</p> )}

            <button>
                Registre
            </button>                
        </form>
    </div>
    )
}

export default SignUp