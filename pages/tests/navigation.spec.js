import { test, expect } from '@playwright/test';
import { IndexPage } from './pages/indexPage.js';
import { AboutPage } from './pages/aboutPage.js';
import { ContactPage } from './pages/contactPage.js';

test.describe('Site navigation tests', () => {
  let page;
  let indexPage, aboutPage, contactPage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    indexPage = new IndexPage(page);
    aboutPage = new AboutPage(page);
    contactPage = new ContactPage(page);
  });

  test('Open home page', async () => {
    await indexPage.goto(); 
    await indexPage.isLoaded(); 
    await indexPage.checkSingleH1() 
  });

  test('Navigate from Home to About and verify h1 and URL', async () => {
    await indexPage.goto();
    await indexPage.isLoaded();

    // About
    await indexPage.navigateToAbout();
    await expect(page).toHaveURL(/about\.html$/); 
    await aboutPage.isLoaded(); 
  });

  test('Navigate from Home to Contact and verify h1 and URL', async () => {
    await indexPage.goto();
    await indexPage.isLoaded();

    // Contact
    await aboutPage.navigateToContact();
    await expect(page).toHaveURL(/contact\.html$/); 
    await contactPage.isLoaded(); 
  });

  test('Navigate from About to Home and verify h1 and URL', async () => {
    await page.goto('/about.html');
    await aboutPage.isLoaded();

     //Home
    await aboutPage.navigateToHome();
    await expect(page).toHaveURL(/index\.html$/); 
    await indexPage.isLoaded(); 
  });
});