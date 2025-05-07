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
  const [billingFrequenciesCollection, setBillingFrequenciesCollection] = useState([]);
  const [tagsCollection, setTagsCollection] = useState([]);
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

  useEffect(() => {
    fetchBillingFrequencies();
    fetchTags();
  }, []);


  // Función para obtener las frecuencias de facturación desde Supabase
  const fetchBillingFrequencies = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("billing_frequencies")
        .select("*");
      if (error) throw error;
      setBillingFrequenciesCollection(data);
    } catch (error) {
      console.error("Error obteniendo las frecuencias de facturación:", error.message);
    }
  }, []);

  // Función para obtener las tags desde Supabase
  const fetchTags = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("tags").select("*");
      if (error) throw error;
      setTagsCollection(data);
    } catch (error) {
      console.error("Error obteniendo los tags:", error.message);
    }
  }, []);

  const handleAddSubscription = (newSubscription) => {
    setSubscriptions((prevSubscriptions) => [
      ...prevSubscriptions,
      newSubscription,
    ]);
  };
  
  const handleEditSubscription = (subscription) => {
    // Establece los datos de la suscripción que se va a editar
    setSubscriptionToEdit(subscription);
    setIsOpen(true);  // Abre el panel de edición
  };
  

  const handleDeleteSubscription = (id) => {
    setSubscriptions((prevSubscriptions) =>
      prevSubscriptions.filter((sub) => sub.id !== id)
    );
  };

  const toggleAddSubscriptionPanel = () => {
    setIsOpen((prev) => !prev);
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
          onEditSubscription={handleEditSubscription}
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
        billingFrequenciesCollection={billingFrequenciesCollection}
        tagsCollection={tagsCollection}
      />
    </div>
  );
}

export default Home;
