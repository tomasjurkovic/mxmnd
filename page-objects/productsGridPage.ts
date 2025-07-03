import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class ProductsGridPage extends HelperBase {

  constructor(page: Page) {
    super(page);

  }
}