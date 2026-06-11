import { useState, useEffect, useRef } from "react";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const refBlogForm = useRef();

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
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  const handleClick = () => {
    globalThis.localStorage.removeItem("logged");
    setUser(null);
  };

  const newBlog = (blogData) => {
    refBlogForm.current.toggleVisibile();
    blogService
      .create(blogData)
      .then((newBlog) => {
        setBlogs(blogs.concat(newBlog));
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author}`,
          type: "success",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      })
      .catch((error) => {
        setNotification({
          message: error.response.data.error,
          type: "error",
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      });
  };

  return (
    <div>
      {user === null ? (
        <>
          <h1>Log in to application</h1>
          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            handle={handleLogin}
          />
        </>
      ) : (
        <>
          <h1>Blogs</h1>

          {notification && (
            <Notification
              message={notification.message}
              type={notification.type}
            />
          )}

          <Logout handleClick={handleClick} user={user} />
          <br />
          <Togglable buttonLabel="create new blog" ref={refBlogForm}>
            <BlogForm newBlog={newBlog} />
          </Togglable>
          <Blogs blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
