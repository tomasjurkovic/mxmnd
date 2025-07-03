import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { ProductsGridPage } from "./productsGridPage";
import { CartPage } from "./cartPage";
import { ProductsDetailPage } from "./productDetailPage";
import { CheckoutYourInformationPage } from "./checkoutYourInformationPage";
import { CheckoutStepTwoPage } from "./checkoutStepTwoPage";
import { CheckoutCompletePage } from "./checkoutCompletePage";

export class PageManager {
    private readonly page: Page;
    private readonly cartPage: CartPage; 
    private readonly loginPage: LoginPage;
    private readonly productsDetailPage: ProductsDetailPage;
    private readonly productsGridPage: ProductsGridPage;
    private readonly checkoutYourInformationPage: CheckoutYourInformationPage;
    private readonly checkoutStepTwoPage: CheckoutStepTwoPage;
    private readonly checkoutCompletePage: CheckoutCompletePage;

    constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productsGridPage = new ProductsGridPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.productsDetailPage = new ProductsDetailPage(this.page);
    this.checkoutYourInformationPage = new CheckoutYourInformationPage(this.page);
    this.checkoutStepTwoPage = new CheckoutStepTwoPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
    }

    async onLoginPage() {
        return this.loginPage;
    }
        
    async onCartPage() {
        return this.cartPage; 
    }

    async onProductDetailsPage() {
        return this.productsDetailPage;
    }

    async onProductsGridPage() {
        return this.productsGridPage;
    }

    async onCheckoutYourInformationPage() {
        return this.checkoutYourInformationPage;
    }

    async onCheckoutStepTwoPage() {
        return this.checkoutStepTwoPage;
    }

    async onCheckoutCompletePage() {
        return this.checkoutCompletePage;
    }
}