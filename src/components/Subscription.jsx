import { useEffect, useState, useCallback, useMemo } from "react";
import SubscriptionsList from "./SubscriptionsList";
import { supabase } from "../DB/supabaseClient";

const Subscriptions = ({ userId }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

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
      console.error("Error al obtener suscripciones:", error.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const subscriptionsMemo = useMemo(() => subscriptions, [subscriptions]);

  return (
    <div>
      <h2>Mis Suscripciones</h2>
      {loading ? <p>Cargando...</p> : <SubscriptionsList subscriptions={subscriptionsMemo} />}
    </div>
  );
};

export default Subscriptions;
