import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";

test.describe.parallel(
  "Tests related to adding products into the cart on products grid page",
  { tag: ["@regression"] },
  () => {

    // As a tester, I consider the adding an item to the basket functionality to be essential on an e-shop website because it allows users to easily select and purchase products they are interested in. It is a fundamental part of the shopping experience, enabling users to manage their selections before proceeding to checkout.

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const pm = new PageManager(page);
        await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
    });

    test("Verify adding the Sauce Labs Backpack product to the cart and checking out if there is selected product with correct name, price and quantity of 1", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        const itemName = await (await pm.onProductDetailsPage()).getItemName();
        const itemPrice = await (await pm.onProductDetailsPage()).getItemPrice(); 
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).verifyItemNamePriceAndQuantityEqual(itemName, itemPrice, "1");
    });
});