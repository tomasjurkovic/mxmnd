import { expect, Page } from "@playwright/test";

export class HelperBase {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyUrlContains(expectedUrl: string): Promise<void> {
    const currentUrl = this.page.url();
    expect(currentUrl).toContain(expectedUrl);
  }
}