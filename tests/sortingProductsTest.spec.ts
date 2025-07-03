import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";
import { SortOptions } from "../enums/sortOptions";

test.describe.parallel(
  "Tests related to sorting functionality on products grid page",
  { tag: ["@regression"] },
  () => {

    // As a tester, I consider the sorting functionality to be essential on an e-shop website because it allows users to easily find and compare products according to its price or name (since there is no filtering, it is the only option how to search here).

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const pm = new PageManager(page);
        await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
    });

    test("Verify sorting functionality works when sorting by name (Z to A)", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).selectSortOption(SortOptions.NAME_Z_TO_A);
        const sortedNames = await (await pm.onProductsGridPage()).getInventoryItemNames(page);
        await (await pm.onProductsGridPage()).verifyProductsAreSortedFromZToA(sortedNames);
    });
});