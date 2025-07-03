import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CheckoutStepTwoPage extends HelperBase {

    constructor(page: Page) {
        super(page);
    }

    async verifyUserIsLocatedOnCheckoutStepTwoPage(): Promise<void> {
        await this.verifyUrlContains("/checkout-step-two.html");
    }
}
