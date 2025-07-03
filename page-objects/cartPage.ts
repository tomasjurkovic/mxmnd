import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CartPage extends HelperBase {

    readonly checkOutBtn: Locator;
    readonly itemQuantity: Locator;
    readonly inventoryItemName: Locator;
    readonly inventoryItemPrice: Locator;

    constructor(page: Page) {
        super(page);
        this.checkOutBtn = page.locator("[data-test='checkout']");
        this.itemQuantity = page.locator("[data-test='item-quantity']");
        this.inventoryItemName = page.locator("[data-test='inventory-item-name']");
        this.inventoryItemPrice = page.locator("[data-test='inventory-item-price']");
    }

    async clickOnCheckoutBtn(): Promise<void> {
        await this.checkOutBtn.click();
    }

    async getItemQuantity(): Promise<string> {
        await this.itemQuantity.waitFor({ state: "visible" });
        return (await this.itemQuantity.textContent()) ?? "";
    }

    async getItemName(): Promise<string> {
        await this.inventoryItemName.waitFor({ state: "visible" });
        return (await this.inventoryItemName.textContent()) ?? "";
    }

    async getItemPrice(): Promise<string> {
        await this.inventoryItemPrice.waitFor({ state: "visible" });
        return (await this.inventoryItemPrice.textContent()) ?? "";
    }

    async verifyItemNamePriceAndQuantityEqual(expectedItemName: string, expectedItemPrice: string, expectedItemQuantity: string): Promise<void> {
        expect(expectedItemName).toEqual(await this.getItemName());
        expect(expectedItemPrice).toEqual(await this.getItemPrice());
        expect(expectedItemQuantity).toEqual(await this.getItemQuantity());
    }
}