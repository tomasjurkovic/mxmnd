import { expect, Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class LoginPage extends HelperBase {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator("[data-test='username']");
    this.passwordInput = page.locator("[data-test='password']");
    this.loginBtn = page.locator("[data-test='login-button']");
    this.errorMessage = page.locator("[data-test='error']");
  }

  async fillUserName(username: string): Promise<void> {
    await this.usernameInput.fill(username, { force: true });
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password, { force: true });
  }

  async clickLoginButton(): Promise<void> {
    await this.loginBtn.click();
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.fillUserName(username);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  async verifyErrorMessageIsDisplayedWhenLoginWithLockedUser(): Promise<void> {
    await this.errorMessage.waitFor({ state: "visible" });
    const errorText = await this.errorMessage.textContent();
    expect(errorText).toContain("Epic sadface: Sorry, this user has been locked out.");
  }
}