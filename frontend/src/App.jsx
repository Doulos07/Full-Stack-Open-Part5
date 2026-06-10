import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then((user) => {
        setUser(user);
        setUsername("");
        setPassword("");
      })
      .catch((error) => console.error(error));
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
        <Blogs blogs={blogs} />
      )}
    </div>
  );
};

export default App;
