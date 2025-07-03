import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";

test.describe.parallel(
  "Tests related to login page",
  { tag: ["@regression"] },
  () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("Verify login with valid credentials", async ({ page }) => {
      const pm = new PageManager(page);
      await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
    });
});