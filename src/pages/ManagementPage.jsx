import React from "react";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";

function ManagementPage() {
    return(
        <>
                <div>ManagementPage</div>
                
                <button onClick={async (e) => await supabase.auth.signOut()}> SIgn Out</button>
        </>

    )
}

export default ManagementPage