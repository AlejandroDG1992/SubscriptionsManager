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
    <div className="p-6 text-gray-900 bg-[#fff] border-2 border-[#EAEBED] dark:text-white dark:border-gray-700 dark:bg-gradient-to-r from-slate-900 to-slate-800 relative rounded-3xl text-gray-200"
      onMouseEnter={() => setHoveredCardId(subscription.id)}
      onMouseLeave={() => {
        setHoveredCardId(null);
        setOpenMenuId(null);
      }}
    >
      <h3 className="text-xl">{subscription.service}</h3>
      <p><strong>Plan:</strong> {subscription.plan}</p>
      <p><strong>Precio:</strong> {subscription.price} €</p>
      <p><strong>Fecha de inicio:</strong> {subscription.dateInitFormatted}</p>
      <p><strong>Próxima facturación:</strong> {subscription.dateBillingFormatted}</p>
      <div className="text-[8px] absolute right-5 bottom-0"
      >{subscription.tags?.name}</div>

      {hoveredCardId === subscription.id && (
        <button onClick={() => setOpenMenuId(subscription.id)} className="absolute top-[5px] right-[10px]"
        >⋮</button>
      )}

      {openMenuId === subscription.id && hoveredCardId === subscription.id && (
        <div className=" absolute top-[20px] right-[10px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-2"
        >
          {/* <button onClick={() => onEditSubscription(subscription)}>
            <FaEdit className="mr-2 text-red-500" />
          </button> */}
          <button onClick={() => deleteSubscription(subscription.id)}>
            <FaTrash className="text-red-500 hover:text-red-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;
