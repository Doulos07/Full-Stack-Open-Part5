const { test, expect, beforeEach, describe } = require("@playwright/test");
const Helper = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/reset");
    await request.post("api/users", {
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
});
