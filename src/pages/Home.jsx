import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";
import AddSubscription from "../components/AddSubscription";

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user?.user) {
          navigate("/Login");
        } else {
          setUserId(user.user.id);
        }
      } catch (error) {
        console.error("Error al obtener usuario:", error.message);
      }
    };

    checkUser();
  }, [navigate]);

  const fetchSubscriptions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*, tags(name)")
        .eq("user_id", userId);

      if (error) throw error;
      setSubscriptions(data);
    } catch (error) {
      console.error("Error obteniendo suscripciones:", error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const toggleAddSubscriptionPanel = () => {
    setIsOpen((prev) => !prev);
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
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/Login");
        }}
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
