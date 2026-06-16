const { test, expect, beforeEach, describe } = require("@playwright/test");
const Helper = require("./helper");
const { title } = require("node:process");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        username: "starklord",
        name: "Santiago Alvarez",
        password: "santiago123",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByText("Log in to application");
    await page.getByText("Username");
    await page.getByText("Password");
    await page.getByRole("button", { name: "login" });
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await Helper.loginWith(page, "starklord", "santiago123");
      await expect(page.getByText("Santiago Alvarez starklord")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await Helper.loginWith(page, "starklord", "santiago12345");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("invalid username or password");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", () => {
    const content = {
      title: "La Ultima Lagrima",
      author: "Memphis la Blusera",
      url: "https://open.spotify.com/track/0cHVi2rirbT62DlX3uabke?si=6a084c99fceb40b4",
    };

    beforeEach(async ({ page }) => {
      await Helper.loginWith(page, "starklord", "santiago123");
      await Helper.createBlog(page, content);
    });

    test("a new blog can be created", async ({ page }) => {
      await expect(
        page.getByText(`${content.title} ${content.author}`),
      ).toBeVisible();
    });

    test("a blog can be liked", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("likes: 0")).toBeVisible();
      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("likes: 1")).toBeVisible();
    });

    test("a blog can be deleted", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).click();

      page.on("dialog", (dialog) => dialog.accept());

      await page.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText(`${content.title} ${content.author}`),
      ).not.toBeVisible();
    });
  });
});
