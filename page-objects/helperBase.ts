import { expect, Locator, Page } from "@playwright/test";

export class HelperBase {
  readonly page: Page;
  readonly cartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartBtn = page.locator("[data-test='shopping-cart-link']");
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(expectedUrl);
  }

  async clickOnCartBtn(): Promise<void> {
    await this.cartBtn.click();
  }
}