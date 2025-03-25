import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import SubscriptionsList from "../components/SubscriptionsList";
import { supabase } from "../DB/supabaseClient";
import AddSubscription from "../components/AddSubscription";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null); // Estado para manejar la suscripción a editar

  // Verificar usuario
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

  // Obtener suscripciones desde la base de datos
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

  const handleAddSubscription = (newSubscription) => {
    // Si es una nueva suscripción, agregamos al final de la lista
    setSubscriptions((prevSubscriptions) => [
      ...prevSubscriptions,
      newSubscription,
    ]);
  };
  
  const handleDeleteSubscription = (id) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.filter((sub) => sub.id !== id)
    );
  };

  // Función para alternar el panel de añadir suscripción
  const toggleAddSubscriptionPanel = () => {
    setIsOpen((prev) => !prev); // Cambiar el estado de apertura/cierre
  };

  return (
    <div>
      <button
        className="logout-btn"
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/Login");
        }}
      >
        Logout
      </button>

      {loading ? (
        <p>Cargando suscripciones...</p>
      ) : (
        <SubscriptionsList
          subscriptions={subscriptions}
          onDeleteSubscription={handleDeleteSubscription}
        />
      )}

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
        onAddSubscription={handleAddSubscription}
      />
    </div>
  );
}

export default Home;
