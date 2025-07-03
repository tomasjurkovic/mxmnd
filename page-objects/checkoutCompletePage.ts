import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CheckoutCompletePage extends HelperBase {

    readonly orderSuccessHeader: Locator;
    readonly orderSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.orderSuccessHeader = page.locator("[data-test='complete-header']");
        this.orderSuccessMessage = page.locator("[data-test='complete-text']");
    }

    async verifyOrderSuccessHeaderIsVisible(): Promise<void> {
        await this.orderSuccessHeader.waitFor({ state: "visible" });
        await expect(this.orderSuccessHeader).toHaveText("Thank you for your order!");
    }

    async verifyOrderSuccessMessageIsVisible(): Promise<void> {
        await this.orderSuccessMessage.waitFor({ state: "visible" });
        await expect(this.orderSuccessMessage).toHaveText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    }

    async orderIsSuccessfullyCompleted(): Promise<void> {
        await this.verifyOrderSuccessHeaderIsVisible();
        await this.verifyOrderSuccessMessageIsVisible();
    }
}
