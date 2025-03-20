import React, { useState } from "react";
import { supabase } from "../DB/supabaseClient";

const AddSubscription = ({ isOpen }) => {
  const [formData, setFormData] = useState({
    service: "",
    plan: "",
    price: "",
    date_init: "",
    date_end: "",
    date_billing: "",
    status: "active",
    url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Maneja el evento cuando se da clic en el botón Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí recogemos los datos y los preparamos para insertarlos
    const {
      service,
      plan,
      price,
      date_init,
      date_end,
      date_billing,
      status,
      url,
    } = formData;

    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      // Llamamos a Supabase para insertar la nueva suscripción
      const { data, error } = await supabase.from("subscriptions").insert([
        {
          service,
          plan_name: plan,
          price,
          date_init,
          date_end,
          date_billing,
          status,
          url,
          user_id: user.user.id
        },
      ]);

      console.log("UserId: " + user.userid)

      if (error) {
        console.error("Error al insertar la suscripción:", error);
      } else {
        console.log("Suscripción insertada:", data);
      }
      isOpen = "";
    }
  };

  return (
    <div className={`add-subscription-form ${isOpen ? "open" : ""}`}>
      <h2>Añadir nueva suscripción</h2>

      <form onSubmit={handleSubmit}>
        <label>Servicio</label>
        <input
          type="text"
          name="service"
          value={formData.service}
          placeholder="Nombre del servicio"
          onChange={handleChange}
        />

        <label>Plan</label>
        <input
          type="text"
          name="plan"
          value={formData.plan}
          placeholder="Nombre del plan"
          onChange={handleChange}
        />

        <label>Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          placeholder="Precio"
          onChange={handleChange}
        />

        <label>Fecha de inicio</label>
        <input
          type="date"
          name="date_init"
          value={formData.date_init}
          onChange={handleChange}
        />

        <label>Fecha de finalización</label>
        <input
          type="date"
          name="date_end"
          value={formData.date_end}
          onChange={handleChange}
        />

        <label>Fecha de facturación</label>
        <input
          type="date"
          name="date_billing"
          value={formData.date_billing}
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
          value={formData.url}
          placeholder="URL de servicio"
          onChange={handleChange}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AddSubscription;
