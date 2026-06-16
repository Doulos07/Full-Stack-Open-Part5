import Blog from "./Blog";

const Blogs = ({ blogs, username, handleLike, handleDelete }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} className="blog">
            <Blog
              key={blog.id}
              blog={blog}
              username={username}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
