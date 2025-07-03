import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ProductsDetailPage extends HelperBase {

    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly addToCartBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.itemName = page.locator("[data-test='inventory-item-name']");
        this.itemPrice = page.locator("[data-test='inventory-item-price']");
        this.addToCartBtn = page.locator("[data-test='add-to-cart']");
    }

    async getItemName(): Promise<string> {
        await this.itemName.waitFor({ state: "visible" });
        return (await this.itemName.textContent()) ?? "";
    }

    async getItemPrice(): Promise<string> {
        await this.itemPrice.waitFor({ state: "visible" });
        return (await this.itemPrice.textContent()) ?? "";
    }

    async clickOnAddToCartBtn(): Promise<void> {
        await this.addToCartBtn.waitFor({ state: "visible" });
        await this.addToCartBtn.click();
    }   
}
