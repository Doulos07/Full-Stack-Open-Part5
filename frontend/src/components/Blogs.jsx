import Blog from "./Blog";

const Blogs = ({ blogs, handleLike, handleDelete }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
