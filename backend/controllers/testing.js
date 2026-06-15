const testingRouter = require("express").Router();
const User = require("../models/users");
const Blog = require("../models/blogs");

testingRouter.post("/reset", async (request, response) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
