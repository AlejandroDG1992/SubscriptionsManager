import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";
import AddSubscription from "../components/AddSubscription";

function Home() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) {
        navigate("/Login");
      } else {
        fetchSubscriptions(user.user.id);
      }
    };

    checkUser();
  }, [navigate]);

  const fetchSubscriptions = async (userId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
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

      {/* Contenedor de los botones flotantes */}
      <div className="floating-buttons">
        <button
          className={`add-subscription-btn ${isOpen ? "open" : ""}`}
          onClick={toggleAddSubscriptionPanel}
        >
          {isOpen ? "x" : "+"}
        </button>
      </div>

      <AddSubscription isOpen={isOpen} toggle={toggleAddSubscriptionPanel} />
    </div>
  );
}

export default Home;
