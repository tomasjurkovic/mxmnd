import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class CheckoutYourInformationPage extends HelperBase {

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly continueBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator("[data-test='firstName']");
        this.lastNameInput = page.locator("[data-test='lastName']");
        this.zipCodeInput = page.locator("[data-test='postalCode']");
        this.continueBtn = page.locator("[data-test='continue']");
        this.errorMessage = page.locator("h3[data-test='error']");
    }

    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName, { force: true });
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName, { force: true });
    }

    async fillZipCode(zipCode: string): Promise<void> {
        await this.zipCodeInput.fill(zipCode, { force: true });
    }

    async clickContinueBtn(): Promise<void> {
        await this.continueBtn.click();
    }

    async fillCheckoutInformation(firstName?: string|null, lastName?: string|null, zipCode?: string|null): Promise<void> {
        if (firstName) await this.fillFirstName(firstName);
        if (lastName) await this.fillLastName(lastName);
        if (zipCode) await this.fillZipCode(zipCode);
        await this.clickContinueBtn();
    }

    async verifyErrorMessageIsDisplayedWhenCheckoutInformationIsNotFilled(missingField: 'firstName' | 'lastName' | 'zipCode'): Promise<void> {
        await this.errorMessage.waitFor({ state: "visible" });
        const expectedMessages = {
            firstName: "Error: First Name is required",
            lastName: "Error: Last Name is required",
            zipCode: "Error: Postal Code is required"
        };
        const errorText = await this.errorMessage.textContent();
        expect(errorText).toContain(expectedMessages[missingField]);
    }
}
