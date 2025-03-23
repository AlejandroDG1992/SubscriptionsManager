import React, { useState, useMemo, useEffect } from "react";
import { supabase } from "../DB/supabaseClient";
import SubscriptionCard from "./SubscriptionCard";
import AddSubscription from "./AddSubscription";
import "../styles/SubscriptionsList.css";

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("es-ES") : "Sin fecha";
};

function SubscriptionsList({ subscriptions }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [subscriptionList, setSubscriptionList] = useState([]);

  useEffect(() => {
    setSubscriptionList(subscriptions);
  }, [subscriptions]);

  const formattedSubscriptions = useMemo(() => {
    return subscriptionList.map((sub) => ({
      ...sub,
      dateInitFormatted: formatDate(sub.date_init),
      dateBillingFormatted: formatDate(sub.date_billing),
    }));
  }, [subscriptionList]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const fetchSubscriptions = async () => {
    try {
      const { data, error } = await supabase.from("subscriptions").select("*");
      if (error) throw error;
      setSubscriptionList(data);
    } catch (error) {
      console.error("Error al obtener las suscripciones:", error);
    }
  };

  const deleteSubscription = async (id) => {
    if (!window.confirm("¿Deseas eliminar la suscripción?")) return;

    try {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSubscriptionList((prevList) =>
        prevList.filter((sub) => sub.id !== id)
      );
      console.log("Suscripción eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la suscripción:", error);
    }
  };

  return (
    <div className="subscriptions-container">
      <h2>Mis Suscripciones</h2>
      {subscriptionList.length > 0 ? (
        <div className="card-container">
          {formattedSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              hoveredCardId={hoveredCardId}
              setHoveredCardId={setHoveredCardId}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              deleteSubscription={deleteSubscription}
            />
          ))}
        </div>
      ) : (
        <p>No hay suscripciones registradas.</p>
      )}

      {isPanelOpen && (
        <AddSubscription
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            fetchSubscriptions();
          }}
        />
      )}
    </div>
  );
}

export default SubscriptionsList;
