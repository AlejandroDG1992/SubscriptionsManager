import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";
import AddSubscription from "../components/AddSubscription";

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) {
        navigate("/Login");
      } else {
        setUserId(user.user.id);
      }
    };

    checkUser();
  }, [navigate]);


  useEffect(() => {
    if (userId) {
      fetchSubscriptions(userId);
    }
  }, [userId]);

  const fetchSubscriptions = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*, tags(name) ")
      .eq("user_id", userId);

    if (error) {
      console.error("Error obteniendo suscripciones:", error.message);
    } else {
      setSubscriptions(data);
    }
    setLoading(false);
  };

  const toggleAddSubscriptionPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {loading ? (
        <p>Cargando suscripciones...</p>
      ) : (
        <SubscriptionsList subscriptions={subscriptions} />
      )}
      <br />
      <button
        className="logout-btn"
        onClick={async () => await supabase.auth.signOut()}
      >
        Logout
      </button>

      <div className="floating-buttons">
        <button
          className={`add-subscription-btn ${isOpen ? "open" : ""}`}
          onClick={toggleAddSubscriptionPanel}
        >
          {isOpen ? "x" : "+"}
        </button>
      </div>
      <AddSubscription
        userId={userId}
        isOpen={isOpen}
        toggle={toggleAddSubscriptionPanel}
        fetchSubscriptions={fetchSubscriptions}
      />
    </div>
  );
}

export default Home;
