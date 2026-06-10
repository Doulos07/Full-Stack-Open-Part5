const Logout = ({ handleClick, user }) => {
  return (
    <div>
      {`${user.name} ${user.username} logged in`}
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;
