import "../styles/notification.css";

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <h3>{message}</h3>
    </div>
  );
};

export default Notification;
