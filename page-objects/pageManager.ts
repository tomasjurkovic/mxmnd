import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { ProductsGridPage } from "./productsGridPage";

export class PageManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly productsGridPage: ProductsGridPage;

    constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.productsGridPage = new ProductsGridPage(this.page);
    }

    async onLoginPage() {
        return this.loginPage;
    }

    async onProductsGridPage() {
        return this.productsGridPage;
    }
}