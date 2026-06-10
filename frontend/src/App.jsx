import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
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
      const user = JSON.parse(logged);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    loginService
      .login(username, password)
      .then((user) => {
        globalThis.localStorage.setItem("logged", JSON.stringify(user));
        blogService.setToken(user.token);
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

  const newBlog = (blogData) => {
    console.log(blogData); // { title, author, url }
    blogService.create(blogData).then((newBlog) => {
      setBlogs(blogs.concat(newBlog));
    });
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
          <h1>Blogs</h1>
          <Logout handleClick={handleClick} user={user} />
          <br />
          <BlogForm onSubmit={newBlog} />
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
