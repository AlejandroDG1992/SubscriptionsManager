import React, { useState } from "react";
import AddSubscription from "./AddSubscription";
import "../styles/SubscriptionsList.css";

function SubscriptionsList({ subscriptions }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const openPanel = () => setIsPanelOpen(true);
  const closePanel = () => setIsPanelOpen(false);

  return (
    <div className="subscriptions-container">
      <h2>Mis Suscripciones</h2>
      {subscriptions.length > 0 ? (
        <div className="card-container">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="card">
              <h3>{subscription.service}</h3>
              <p>
                <strong>Plan:</strong> {subscription.plan_name}
              </p>
              <p>
                <strong>Precio:</strong> {subscription.price} €
              </p>
              <p>
                <strong>Fecha de inicio:</strong>{" "}
                {new Date(subscription.date_init).toLocaleDateString("es-ES")}
              </p>
              <p>
                <strong>Próxima facturación:</strong>{" "}
                {new Date(subscription.date_billing).toLocaleDateString(
                  "es-ES"
                )}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay suscripciones registradas.</p>
      )}

      {/* Panel lateral para agregar suscripción */}
      {isPanelOpen && <AddSubscription closePanel={closePanel} />}
    </div>
  );
}

export default SubscriptionsList;
