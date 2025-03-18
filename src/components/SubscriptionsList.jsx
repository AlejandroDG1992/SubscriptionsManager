import React, { useEffect, useState } from "react";
import { supabase } from "../DB/supabaseClient";

function SubscriptionsList() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        getSubscriptions();
    }, []);

    async function getSubscriptions() {
        try {
            // Obtener el usuario autenticado correctamente
            const { data: user, error: userError } = await supabase.auth.getUser();

            if (userError) {
                console.error("Error obteniendo el usuario:", userError.message);
                return;
            }

            const userId = user?.user?.id;

            if (!userId) {
                console.warn("No hay usuario autenticado.");
                return;
            }

            console.log("User ID:", userId);

            // Consulta a Supabase con el user_id correcto
            const { data, error } = await supabase
                .from("subscriptions")
                .select()
                .eq("user_id", userId);

            if (error) {
                console.error("Error obteniendo suscripciones:", error.message);
            } else {
                setSubscriptions(data);
            }
        } catch (error) {
            console.error("Error general:", error);
        }
    }

    return (
        <div className="table-container">
            <h2>Mis Suscripciones</h2>
            {subscriptions.length > 0 ? (
                <table border="1" className="styled-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Plan</th>
                            <th>Price</th>
                            <th>Initial date</th>
                            <th>Next billing date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map((subscription) => (
                            <tr key={subscription.id}>
                                <td>{subscription.service}</td>
                                <td>{subscription.plan_name}</td>
                                <td>{subscription.price} €</td>
                                <td>{new Date(subscription.date_init).toLocaleDateString("es-ES")}</td>
                                <td>{new Date(subscription.date_billing).toLocaleDateString("es-ES")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay suscripciones registradas.</p>
            )}
        </div>
    );
}

export default SubscriptionsList;
