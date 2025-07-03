import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";
import { SortOptions } from "../enums/sortOptions";

export class ProductsGridPage extends HelperBase {

    readonly sortDropdown: Locator;
    readonly sauceLabsBackpackItem: Locator;

    constructor(page: Page) {
        super(page);
        this.sortDropdown = page.locator("select[data-test='product-sort-container']");
        this.sauceLabsBackpackItem = page.locator("img[alt='Sauce Labs Backpack']"); 
    }

    async clickOnSauceLabsBackpackItem(): Promise<void> {
        await this.sauceLabsBackpackItem.waitFor({ state: "visible" });
        await this.sauceLabsBackpackItem.click();
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

    async verifyProductsAreSorted(itemNames: string[], order: "asc" | "desc" = "asc"): Promise<void> {
        const sortedItemNames = [...itemNames].sort((a, b) =>
            order === "asc" ? a.localeCompare(b) : b.localeCompare(a)
        );
        expect(itemNames).toEqual(sortedItemNames);
    }
}
