import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Logout from "./components/Logout";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const logged = globalThis.localStorage.getItem("logged");
    if (logged) {
      setUser(JSON.parse(logged));
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then((user) => {
        globalThis.localStorage.setItem("logged", JSON.stringify(user));
        setUser(user);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.error(error));
  };

  const handleClick = () => {
    globalThis.localStorage.removeItem("logged");
    setUser(null);
  };

  return (
    <div>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handle={handleLogin}
        />
      ) : (
        <>
          <Blogs blogs={blogs} />
          <Logout handleClick={handleClick} />
        </>
      )}
    </div>
  );
};

export default App;
