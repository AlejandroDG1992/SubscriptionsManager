import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../DB/supabaseClient";

const AddSubscription = ({ userId, isOpen, toggle, onAddSubscription, onEditSubscription, tagsCollection }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    service: null,
    plan: null,
    price: null,
    date_init: null,
    date_end: null,
    date_billing: null,
    status: "active",
    url: null,
    tag_id: null,
  });

  // Función para manejar los cambios en los inputs
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        if (userId) {
          // Si la suscripción está siendo editada, usa su ID, si no, genera uno nuevo.
          const newSubscriptionData = {
            ...formData,
            user_id: userId,
            id: uuidv4()
          };

          const { error } = await supabase
            .from("subscriptions")
            .upsert([newSubscriptionData]);

          if (error) throw error;

          setFormData({
            service: null,
            plan: null,
            price: null,
            date_init: null,
            date_end: null,
            date_billing: null,
            status: "active",
            url: null,
            tag_id: null,
          });

          // Aquí pasas la suscripción con el UUID generado a tu estado de suscripciones
          onAddSubscription({
            id: newSubscriptionData.id,
            ...formData,
          });
        }
      } catch (error) {
        console.error("Error al insertar la suscripción:", error);
        alert("Hubo un error al agregar la suscripción.");
      } finally {
        setIsSubmitting(false);
        toggle();
      }
    },
    [formData, onAddSubscription, toggle, userId]
  );

  return (
    <div className={`add-subscription-form ${isOpen ? "open" : ""}`}>
      <h2>{"Añadir nueva suscripción"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Servicio*</label>
        <input
          type="text"
          name="service"
          value={formData.service || ""}
          onChange={handleChange}
          required
        />

        <label>Plan</label>
        <input
          type="text"
          name="plan"
          value={formData.plan || ""}
          onChange={handleChange}
        />

        <label>Precio (€)*</label>
        <input
          type="number"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          required
        />

        <label>Fecha de inicio*</label>
        <input
          type="date"
          name="date_init"
          value={formData.date_init || ""}
          onChange={handleChange}
          required
        />

        <label>Fecha de finalización</label>
        <input
          type="date"
          name="date_end"
          value={formData.date_end || ""}
          onChange={handleChange}
        />

        <label>Fecha de facturación</label>
        <input
          type="date"
          name="date_billing"
          value={formData.date_billing || ""}
          onChange={handleChange}
        />

        <label>Estado</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Activo</option>
          <option value="cancel">Cancelado</option>
          <option value="pending">Pendiente</option>
        </select>

        <label>URL</label>
        <input
          type="url"
          name="url"
          value={formData.url || ""}
          onChange={handleChange}
        />

        <label>Tipo de suscripción</label>
        <select
            name="tag_id"
            value={formData.tag_id || ""}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {tagsCollection.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default AddSubscription;
