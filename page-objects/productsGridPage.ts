import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { SortOptions } from "../enums/sortOptions";

export class ProductsGridPage extends HelperBase {

    readonly cartLink: Locator;
    readonly sortDropdown: Locator;

    constructor(page: Page) {
        super(page);
        this.cartLink = page.locator("[data-test='shopping-cart-link']");
        this.sortDropdown = page.locator("select[data-test='product-sort-container']");
    }

    async clickCartLink(): Promise<void> {
        await this.cartLink.click();
    }

    async selectSortOption(option: SortOptions): Promise<void> {
        await this.sortDropdown.waitFor({ state: "visible" });
        await this.sortDropdown.click({ force: true });
        await this.sortDropdown.selectOption(option);
    }

    async getInventoryItemNames(page): Promise<string[]> {
        return await page.$$eval(
            '[data-test="inventory-item-name"]',
            items => items.map(item => item.textContent.trim())
        );
    }

    async verifyProductsAreSortedFromZToA(itemNames: string[]): Promise<void> {
        const sortedItemNames = [...itemNames].sort((a, b) => b.localeCompare(a));
        expect(itemNames).toEqual(sortedItemNames);
    }
}
