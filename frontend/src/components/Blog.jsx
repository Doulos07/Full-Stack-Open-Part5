import "../styles/blog.css";
import { useState } from "react";

const Blog = ({ blog }) => {
  const [visibile, setVisibile] = useState(false);

  const visibileDetail = { display: visibile ? "" : "none" };
  return (
    <div className="blog">
      {blog.title}
      <button onClick={() => setVisibile(!visibile)}>
        {visibile ? "hide" : "view"}
      </button>
      <div style={visibileDetail}>
        <p>url: {blog.url}</p>
        <p>
          likes: {blog.likes} <button>like</button>
        </p>
        <p>author: {blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
