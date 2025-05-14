import React, { useState, useMemo } from "react";
import { supabase } from "../DB/supabaseClient";
import SubscriptionCard from "./SubscriptionCard";
// import "../styles/SubscriptionsList.css";

const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString("es-ES") : "Sin fecha";
};

function SubscriptionsList({ subscriptions, onDeleteSubscription, onEditSubscription }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Usamos useMemo para optimizar la renderización
  const formattedSubscriptions = useMemo(() => {
    return subscriptions.map((sub) => ({
      ...sub,
      dateInitFormatted: formatDate(sub.date_init),
      dateBillingFormatted: formatDate(sub.date_billing),
    }));
  }, [subscriptions]);

  const deleteSubscription = async (id) => {
    if (!window.confirm("¿Deseas eliminar la suscripción?")) return;
  
    try {
      const { error } = await supabase
        .from("subscriptions")
        .delete()
        .eq("id", id);  // El id debe ser un UUID
  
      if (error) throw error;
  
      // Actualizamos el estado local usando la función onDeleteSubscription
      onDeleteSubscription(id);
  
      console.log("Suscripción eliminada con éxito");
    } catch (error) {
      console.error("Error al eliminar la suscripción:", error);
    }
  };

  return (
    <div className="container mx-auto ">
      <h2 className="text-2xl text-gray dark:text-white">Mis Suscripciones</h2>
      {subscriptions.length > 0 ? (
        <div className="grid mt-5 gap-4 grid-cols-1 sm:grid-cols- md:grid-cols-3 lg:grid-cols-4"
        >
          {formattedSubscriptions.map((subscription) => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              hoveredCardId={hoveredCardId}
              setHoveredCardId={setHoveredCardId}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              deleteSubscription={deleteSubscription} // Pasamos la función de eliminar
              onEditSubscription={onEditSubscription} // Pasamos la función de editar
            />
          ))}
        </div>
      ) : (
        <p>No hay suscripciones registradas.</p>
      )}
    </div>
  );
}

export default SubscriptionsList;
