import "../styles/blog.css";
import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [visibile, setVisibile] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const handleLinke = () => {
    const updateBlog = { ...blog, likes: likes + 1, user: blog.user.id };
    blogService.update(updateBlog).then((updateBlog) => {
      setLikes(updateBlog.likes);
    });
  };

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
          likes: {likes} <button onClick={handleLinke}>like</button>
        </p>
        <p>author: {blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
