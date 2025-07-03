import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";

test.describe.parallel(
  "Tests related to login page",
  { tag: ["@regression"] },
  () => {

    // As a tester, I consider the login functionality to be essential on an e-shop website because it is the gateway for users to access and manage their accounts. 
    
    test.beforeEach(async ({ page }) => {
      await page.goto("/");
    });

    test("Verify login with valid credentials", async ({ page }) => {
      const pm = new PageManager(page);
      await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
      await (await pm.onLoginPage()).verifyUserIsLoggedInAndSeeProductsGridPage();
    });

    test("Verify login with locked user", async ({ page }) => {
      const pm = new PageManager(page);
      await (await pm.onLoginPage()).fillCredentials(credentials.locked_username, credentials.valid_password);
      await (await pm.onLoginPage()).verifyErrorMessageIsDisplayedWhenLoginWithLockedUser();
    });
});