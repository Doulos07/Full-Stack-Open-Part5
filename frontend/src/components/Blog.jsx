import "../styles/blog.css";
import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visibile, setVisibile] = useState(false);

  const visibileDetail = { display: visibile ? "" : "none" };
  return (
    <div className="blog">
      {blog.title}
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
        <p>author: {blog.author}</p>
        <button onClick={() => handleDelete(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
