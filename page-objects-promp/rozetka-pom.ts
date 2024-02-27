import { expect, type Locator, type Page } from '@playwright/test';

export class rozetka {
    readonly page: Page;
    readonly logo: Locator;
    readonly searchField: Locator;
    readonly searchBtn: Locator;
    readonly catalog: Locator;
    readonly firstProduct: Locator;
    readonly Agemodal: Locator;
    readonly AgemodalConfirm: Locator;
    readonly CheckedProduct: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.getByRole('link', { name: 'Rozetka Logo' });
        this.searchField = page.getByPlaceholder('Я шукаю');
        this.searchBtn = page.getByRole('button', { name: 'Знайти' });
        this.catalog = page.getByLabel('Каталог');
        this.firstProduct = page.locator('//ul/li[@class="catalog-grid__cell catalog-grid__cell_type_slim ng-star-inserted"][1]')
        this.Agemodal = page.locator('//div[@class="fe-banner__description"]')
        this.AgemodalConfirm = page.locator('//input[@class="button button--medium popup-content__button button--green ng-star-inserted"]')
        this.CheckedProduct = page.locator('//a[@title="Олівець для очей Estée Lauder Smoke And Brighten Kajal Eyeliner Duo 2 w 1 Bordeaux/Ivory Кремовий 0.5 г (887167655959)"]')
    }

    async goto() {
        await this.page.goto('https://rozetka.com.ua/');
    }

    async Vibility() {
        await this.goto()
        await this.logo.isVisible()
        await this.searchField.isVisible()
        await this.searchBtn.isVisible()
        await this.catalog.isVisible()
    }

    async tab1() {
        await this.searchField.isVisible()
        await this.searchField.pressSequentially("smoke")
        await this.searchBtn.click()
        await this.page.waitForTimeout(6000);
        let trueconfirmAge = Boolean(expect(await this.Agemodal).toBeVisible())
        if (trueconfirmAge = true) {
            await this.AgemodalConfirm.click()
            expect(await this.firstProduct).toBeVisible()
            await this.firstProduct.click()
        }
    }
}