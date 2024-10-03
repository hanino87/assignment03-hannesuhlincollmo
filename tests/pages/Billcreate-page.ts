import { type Locator, type Page } from '@playwright/test';

export class BillcreatePage {

    readonly page: Page;
    readonly savebutton: Locator;
    readonly fillvaluearea: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fillvaluearea = page.getByRole('spinbutton');
        this.savebutton = page.getByText('Save');
    }

    async Createbillwithoutanyvalue() {
        await this.fillvaluearea.fill("")
        await this.savebutton.click();

    }

}