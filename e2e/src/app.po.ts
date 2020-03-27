import {browser, by, element} from 'protractor';

export class AppPage {
  public async navigateTo(): Promise<string> {
    return browser.get('/');
  }
  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
}
