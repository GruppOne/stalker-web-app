import {expect} from 'chai';
import {Before, Given, Then} from 'cucumber';
import {AppPage} from './app.po';

let app: AppPage;

Before(() => {
  app = new AppPage();
});

Given('I am on the stalker site', () => app.navigateTo());

Then('I should see the title to be Stalker-web-app', () =>
  app
    .getTitleText()
    .then((elem) => expect(elem.toString()).to.be.equal('stalker-web-app is running!')),
);
