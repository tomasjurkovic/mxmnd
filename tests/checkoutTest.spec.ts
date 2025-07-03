import test from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";
import credentials from "../.auth/credentials.json";

test.describe.parallel(
  "Tests related to checkout page",
  { tag: ["@regression"] },
  () => {

    // As a tester, I consider the checkout functionality to be essential on an e-shop website because it is the final step in the purchasing process before confirming the order. It ensures a smooth transition from product selection to order confirmation. Inserting correct data is necessary to ensure that the order is processed correctly and that the user receives their purchased items without issues.

    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        const pm = new PageManager(page);
        await (await pm.onLoginPage()).fillCredentials(credentials.valid_username, credentials.valid_password);
    });

    test("Verify user can proceed to checkout step 2 page when inserting valid information into checkout form", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation("John", "Doe", "12345");
        await (await pm.onCheckoutStepTwoPage()).waitForSpecificNumberOfSeconds(0.5);
        await (await pm.onCheckoutStepTwoPage()).verifyUserIsLocatedOnCheckoutStepTwoPage();
    });

    test("Verify correct error message appears when user forgets to insert first name in checkout form", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation(null, "Doe", "12345");
        await (await pm.onCheckoutYourInformationPage()).verifyErrorMessageIsDisplayedWhenCheckoutInformationIsNotFilled("firstName")
    });

    test("Verify correct error message appears when user forgets to insert last name in checkout form", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation("John", null, "12345");
        await (await pm.onCheckoutYourInformationPage()).verifyErrorMessageIsDisplayedWhenCheckoutInformationIsNotFilled("lastName")
    });

    test("Verify correct error message appears when user forgets to insert zip code in checkout form", async ({ page }) => {
        const pm = new PageManager(page);
        await (await pm.onProductsGridPage()).clickOnSauceLabsBackpackItem();
        await (await pm.onProductDetailsPage()).clickOnAddToCartBtn();  
        await (await pm.onProductDetailsPage()).clickOnCartBtn();
        await (await pm.onCartPage()).clickOnCheckoutBtn();
        await (await pm.onCheckoutYourInformationPage()).fillCheckoutInformation("John", "Doe");
        await (await pm.onCheckoutYourInformationPage()).verifyErrorMessageIsDisplayedWhenCheckoutInformationIsNotFilled("zipCode")
    });
});