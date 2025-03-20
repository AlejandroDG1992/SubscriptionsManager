import { useEffect, useState } from "react";
import SubscriptionsList from "./SubscriptionsList";
import { supabase } from "../DB/supabaseClient";

const Subscriptions = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!userId) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("subscriptions")
        .select()
        .eq("user_id", userId);

      if (error) {
        console.error("Error al obtener suscripciones:", error);
      } else {
        setSubscriptions(data);
      }
      setLoading(false);
    };

    fetchSubscriptions();
  }, [userId]);

  return (
    <div>
      <h2>Mis Suscripciones</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <SubscriptionsList subscriptions={subscriptions} />
      )}
    </div>
  );
};

export default Subscriptions;
