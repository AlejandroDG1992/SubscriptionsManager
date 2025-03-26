import { FaEdit, FaTrash } from "react-icons/fa";

const SubscriptionCard = ({
  subscription,
  hoveredCardId,
  setHoveredCardId,
  openMenuId,
  setOpenMenuId,
  onEditSubscription,
  deleteSubscription
}) => {
  return (
    <div
      className="card"
      onMouseEnter={() => setHoveredCardId(subscription.id)}
      onMouseLeave={() => {
        setHoveredCardId(null);
        setOpenMenuId(null);
      }}
    >
      <h3>{subscription.service}</h3>
      <p><strong>Plan:</strong> {subscription.plan}</p>
      <p><strong>Precio:</strong> {subscription.price} €</p>
      <p><strong>Fecha de inicio:</strong> {subscription.dateInitFormatted}</p>
      <p><strong>Próxima facturación:</strong> {subscription.dateBillingFormatted}</p>
      <div className="tag">{subscription.tags?.name}</div>

      {hoveredCardId === subscription.id && (
        <button onClick={() => setOpenMenuId(subscription.id)} className="edit-btn">⋮</button>
      )}

      {openMenuId === subscription.id && hoveredCardId === subscription.id && (
        <div className="menu-dropdown active">
          {/* <button onClick={() => onEditSubscription(subscription)}>
            <FaEdit className="mr-2 text-red-500" />
          </button> */}
          <button onClick={() => deleteSubscription(subscription.id)}>
            <FaTrash className="mr-2 text-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
