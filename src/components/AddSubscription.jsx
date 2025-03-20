import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../DB/supabaseClient";

const AddSubscription = ({ isOpen }) => {
  const [tagsCollection, setTagsCollection] = useState([]);
  const [formData, setFormData] = useState({
    service: "",
    plan: "",
    price: "",
    date_init: "",
    date_end: "",
    date_billing: "",
    status: "active",
    url: "",
    tag_id: "",
  });

  const fetchTags = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("tags").select("*");
      if (error) throw error;
      setTagsCollection(data);
    } catch (error) {
      console.error("Error obteniendo los tags:", error.message);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      service,
      plan,
      price,
      date_init,
      date_end,
      date_billing,
      status,
      url,
      tag_id,
    } = formData;
  
    const { data: user } = await supabase.auth.getUser();
    if (user?.user) {
      const { data, error } = await supabase.from("subscriptions").insert([
        {
          service: service || null,
          plan: plan || null,
          price: price || null,
          date_init: date_init || null,
          date_end: date_end || null,
          date_billing: date_billing || null,
          status: status || "active",
          url: url || null,
          tag_id: tag_id || null,
          user_id: user.user.id,
        },
      ]);
  
      if (error) {
        console.error("Error al insertar la suscripción:", error);
      } else {
        console.log("Suscripción insertada:", data);
      }
    }
  };

  return (
    <div className={`add-subscription-form ${isOpen ? "open" : ""}`}>
      <h2>Añadir nueva suscripción</h2>

      <form onSubmit={handleSubmit}>
        <label>Servicio</label>
        <input type="text" name="service" value={formData.service} placeholder="Nombre del servicio" onChange={handleChange} />

        <label>Plan</label>
        <input type="text" name="plan" value={formData.plan} placeholder="Nombre del plan" onChange={handleChange} />

        <label>Precio</label>
        <input type="number" name="price" value={formData.price} placeholder="Precio" onChange={handleChange} />

        <label>Fecha de inicio</label>
        <input type="date" name="date_init" value={formData.date_init} onChange={handleChange} />

        <label>Fecha de finalización</label>
        <input type="date" name="date_end" value={formData.date_end} onChange={handleChange} />

        <label>Fecha de facturación</label>
        <input type="date" name="date_billing" value={formData.date_billing} onChange={handleChange} />

        <label>Estado</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="active">Activo</option>
          <option value="cancel">Cancelado</option>
          <option value="pending">Pendiente</option>
        </select>

        <label>URL</label>
        <input type="url" name="url" value={formData.url} placeholder="URL de servicio" onChange={handleChange} />

        <label>Tipo de suscripción</label>
        <select name="tag_id" value={formData.tag_id} onChange={handleChange}>
          <option value="">Selecciona una categoría</option>
          {tagsCollection.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default AddSubscription;
