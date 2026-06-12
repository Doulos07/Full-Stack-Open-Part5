import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";

const blog = {
  title: "Test Blog Title",
  author: "Test Author",
  url: "https://testblog.com",
  likes: 5,
  user: {
    username: "testuser",
  },
};

// 5.13
test("renders title and author, but not url or likes by default", () => {
  const { container } = render(
    <Blog
      blog={blog}
      username="otheruser"
      handleLike={() => {}}
      handleDelete={() => {}}
    />,
  );

  expect(screen.getByText(/Test Blog Title/)).toBeDefined();
  expect(screen.getByText(/Test Author/)).toBeDefined();

  const detail = container.querySelector(".blogDetail");
  expect(detail).toHaveStyle("display: none");
});

// 5.14
test("shows url and likes after clicking view button", async () => {
  const user = userEvent.setup();
  const { container } = render(
    <Blog
      blog={blog}
      username="otheruser"
      handleLike={() => {}}
      handleDelete={() => {}}
    />,
  );

  await user.click(screen.getByText("view"));

  const detail = container.querySelector(".blogDetail");
  expect(detail).not.toHaveStyle("display: none");
});

// 5.15
test("double click likes", async () => {
  const user = userEvent.setup();
  const like = vi.fn();

  render(
    <Blog
      blog={blog}
      username="otheruser"
      handleLike={like}
      handleDelete={() => {}}
    />,
  );

  await user.click(screen.getByText("view"));

  const likeButton = screen.getByText("like");

  await user.dblClick(likeButton);

  console.log("likes:", like.mock.calls.length);
  expect(like).toHaveBeenCalledTimes(2);
});
