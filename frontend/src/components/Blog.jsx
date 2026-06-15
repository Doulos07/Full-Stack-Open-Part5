import "../styles/blog.css";
import { useState } from "react";

const Blog = ({ blog, username, handleLike, handleDelete }) => {
  const [visibile, setVisibile] = useState(false);

  const visibileDetail = { display: visibile ? "" : "none" };
  return (
    <div className="blogDetail">
      {blog.title} {blog.author}
      <button onClick={() => setVisibile(!visibile)}>
        {visibile ? "hide" : "view"}
      </button>
      <div style={visibileDetail}>
        <a href={blog.url} target="_blank">
          {blog.url}
        </a>
        <p>
          likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>like</button>
        </p>
        <p>author: {blog.user.username}</p>
        {username === blog.user.username && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
