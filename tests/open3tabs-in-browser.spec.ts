import { test, expect, chromium } from "@playwright/test";
import { rozetka } from "../page-objects-promp/rozetka-pom";

test('Make changes in two pages', async ({ page, browser }) => {
    //tab1
    const site = new rozetka(page);
    let PageContext = await page.context();
    await site.Vibility()
    await site.tab1()
    //tab2
    let tab2 = await PageContext.newPage();
    await tab2.goto('https://rozetka.com.ua/');
    await tab2.waitForLoadState('networkidle');
    expect(await tab2.locator('//section[@class="main-goods ng-star-inserted"][1]')).toBeVisible()
    await tab2.waitForTimeout(2000);
})

test("Make changes in two browsers", async ({ browser }) => {
    const browser1 = await chromium.launch();
    const context1 = await browser1.newContext();
    const page1 = await context1.newPage();
    await page1.goto('https://playwright.dev/');

    // browser2
    const browser2 = await chromium.launch();
    const context2 = await browser2.newContext();
    const page2 = await context2.newPage();
    await page2.waitForTimeout(6000);
    await page2.goto('https://google.com/');
});
