import {AppPage} from './app.po';
import {expect} from 'chai';
import {Before, Given, Then} from 'cucumber';

let app: AppPage;

Before(() => {
  app = new AppPage();
});

Given('I am on the stalker site', async () => app.navigateTo());

Then('I should see the Login Page', async () =>
  app.getLoginText().then((elem) => expect(elem.toString()).to.be.equal('Login')),
);
