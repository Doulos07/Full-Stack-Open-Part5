import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";

test("calls event handler with correct data when creating a blog", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm newBlog={createBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const submitButton = container.querySelector(".create-button");

  await user.type(titleInput, "Clean Code");
  await user.type(authorInput, "Robert Martin");
  await user.type(urlInput, "https://clean-code.com");

  await user.click(submitButton);

  expect(createBlog).toHaveBeenCalledTimes(1);

  /*
    [0] => First mock
    [0] => First arg
  */
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Clean Code",
    author: "Robert Martin",
    url: "https://clean-code.com",
  });
});
