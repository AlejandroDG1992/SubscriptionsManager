import React from "react";

function AddSubscription({ isOpen }) {
    return (
        <div className={`add-subscription-form ${isOpen ? "open" : ""}`}>
            <h2>Añadir nueva suscripción</h2>
            
            <label>Servicio</label>
            <input type="text" placeholder="Nombre del servicio" />
            
            <label>Plan</label>
            <input type="text" placeholder="Nombre del plan" />

            <label>Precio</label>
            <input type="number" placeholder="Precio" />

            <label>Fecha de inicio</label>
            <input type="date" />

            <label>Fecha de finalización</label>
            <input type="date" />

            <label>URL</label>
            <input type="url" placeholder="URL de servicio" />

            <button>Guardar</button>
        </div>
    );
}

export default AddSubscription;
