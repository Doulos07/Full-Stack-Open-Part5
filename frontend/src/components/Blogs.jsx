import Blog from "./Blog";

const Blogs = ({ blogs, username, handleLike, handleDelete }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <Blog
            key={blog.id}
            blog={blog}
            username={username}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        );
      })}
    </div>
  );
};

export default Blogs;
