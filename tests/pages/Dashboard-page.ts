import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly billlink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billlink = page.locator('#app > div > div > div:nth-child(3) > a');
  }

  async clickonviewlinkforbill() {
    await this.billlink.click();
  }

}