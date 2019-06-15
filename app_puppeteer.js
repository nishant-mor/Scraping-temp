const puppeteer = require('puppeteer');
const util = require('util');




(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://wn.nr/7t5hSS');

  await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > fieldset.center > div > ul > li:nth-child(1) > a');

  //await page.waitForSelector('[name="email"]'); 
  await page.waitForSelector('[name="name"]');

  await page.focus('[name="name"]'); // Focus on Email
  await page.keyboard.type('Nitish');

  await page.keyboard.press('Tab', {
    delay: 100
  });
  await page.keyboard.type('Notissh.car.sfee@gmail.com');

  // Continue Click 
  //await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');

  await page.waitForSelector('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');
  await new Promise(r => setTimeout(r, 1000)) // add wait ;

  await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');

  await new Promise(r => setTimeout(r, 1000)) // add wait ;

  await page.click('#em4283736 > a > span.text.user-links.ng-scope');
  await new Promise(r => setTimeout(r, 1000)) // add wait ;

  await page.click('#em4283736 > div > div > form > div.form-compact__content.center > div:nth-child(2) > a');

  await browser.close();
})();


//<input id="contestant[name]" name="name" ng-model-options="{ debounce: 300 }" ng-model="contestantState.form.name" ng-pattern=".*" placeholder="Alice Smith" required="" style="width: 246px" type="text" class="ng-valid-pattern ng-dirty ng-valid-parse ng-touched ng-empty ng-invalid ng-invalid-required">

//<input id="contestant[email]" name="email" ng-change="contestantState.failedEmail = nil" ng-model-options="{ debounce: 300 }" ng-model="contestantState.form.email" pattern="[A-Z0-9._%a-z\-+]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,12}" placeholder="alice.smith@example.com" required="" style="width: 246px; -webkit-appearance: none;" type="email" class="ng-pristine ng-untouched ng-empty ng-valid-email ng-invalid ng-invalid-required ng-valid-pattern">