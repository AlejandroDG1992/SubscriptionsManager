import React, { useEffect } from "react";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!supabase.auth.getUser()){
            navigate("/Login")
    }
 },[navigate])

    return(
    <div>
        <SubscriptionsList/>
        <br/>
        <button onClick=
        {async (e) => await supabase.auth.signOut()}> 
            Logout
        </button>
    </div>

    )
}

export default Home