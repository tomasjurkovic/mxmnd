import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";

test.describe.parallel(
  "E2E Tests related to creating orders",
  { tag: ["@regression", "@e2e"] },
  () => {

    // As a tester, I consider the finish order as the most important functionality on an e-shop website because it is the final step in the purchasing process. It ensures that users can successfully complete their transactions and receive their purchased items. Without this functionality, users would not be able to finalize their orders, making it essential for a functional e-commerce platform. This tests are definitely part of E2E tests, as they cover the entire flow from product selection to order completion.
    
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const pm = new PageManager(page);
        await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
    });

    test("Verify correct item name, price and quantity in checkout step two", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        const itemName = await (await pm.onProductDetailsPage()).getItemName();
        const itemPrice = await (await pm.onProductDetailsPage()).getItemPrice(); 
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation("John", "Doe", "12345");
        await (await pm.onCheckoutStepTwoPage()).waitForSpecificNumberOfSeconds(0.5);
        await (await pm.onCheckoutStepTwoPage()).verifyItemNamePriceAndQuantityEqual(itemName, itemPrice, "1");
    });

    test("Verify user can create an order successfully", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation("John", "Doe", "12345");
        await (await pm.onCheckoutStepTwoPage()).waitForSpecificNumberOfSeconds(0.5);
        await (await pm.onCheckoutStepTwoPage()).clickOnFinishBtn();
        await (await pm.onCheckoutCompletePage()).orderIsSuccessfullyCompleted();
    });
});