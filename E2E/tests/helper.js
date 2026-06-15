const loginWith = async (page, username, password) => {
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, content) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.locator("#title").fill(content.title);
  await page.locator("#author").fill(content.author);
  await page.locator("#url").fill(content.url);
  await page.getByRole("button", { name: "Create" }).click();
};
module.exports = { loginWith, createBlog };
