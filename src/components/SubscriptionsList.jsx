import React, { useState, useMemo } from "react";
import AddSubscription from "./AddSubscription";
import "../styles/SubscriptionsList.css";

function SubscriptionsList({ subscriptions }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);

  const formattedSubscriptions = useMemo(() => {
    return subscriptions.map((subscription) => ({
      ...subscription,
      dateInitFormatted: new Date(subscription.date_init).toLocaleDateString("es-ES"),
      dateBillingFormatted: new Date(subscription.date_billing).toLocaleDateString("es-ES"),
    }));
  }, [subscriptions]);

  return (
    <div className="subscriptions-container">
      <h2>Mis Suscripciones</h2>
      
      {subscriptions.length > 0 ? (
        <div className="card-container">
          {formattedSubscriptions.map((subscription) => (
            <div key={subscription.id} className="card">
              <h3>{subscription.service}</h3>
              <p><strong>Plan:</strong> {subscription.plan_name}</p>
              <p><strong>Precio:</strong> {subscription.price} €</p>
              <p><strong>Fecha de inicio:</strong> {subscription.dateInitFormatted}</p>
              <p><strong>Próxima facturación:</strong> {subscription.dateBillingFormatted}</p>
              
              {subscription.tags?.length > 0 && (
                <div className="tags-container">
                  {subscription.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag.name}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay suscripciones registradas.</p>
      )}
      
      {isPanelOpen && <AddSubscription toggle={togglePanel} />}
    </div>
  );
}

export default SubscriptionsList;
