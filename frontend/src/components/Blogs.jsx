import Blog from "./Blog";

const Blogs = ({ blogs, handleLike }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return <Blog key={blog.id} blog={blog} handleLike={handleLike} />;
      })}
    </div>
  );
};

export default Blogs;
