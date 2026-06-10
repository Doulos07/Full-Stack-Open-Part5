const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handle,
}) => {
  return (
    <>
      <form onSubmit={handle}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
