import {browser, by, element} from 'protractor';

export class AppPage {
  public navigateTo() {
    return browser.get('/');
  }
  getTitleText() {
    return element(by.css('app-root .content span')).getText();
  }
}
