import { type Locator, type Page } from '@playwright/test';

export class BilllistPage {

  readonly page: Page;
  readonly createbillbutton: Locator;
  readonly dotbutton: Locator;
  readonly editbutton: Locator;
  readonly billtitelheader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createbillbutton = page.getByRole('link', { name: 'Create Bill' });
    this.dotbutton = page.getByRole('img');
    this.editbutton = page.getByText('Edit');
    this.billtitelheader = page.locator('#app > div > h2 > div');
  }
  async clickoncreatBill() {
    await this.createbillbutton.click();
  }

  async clickonheadebilllist() {
    await this.billtitelheader.click();

  }



}