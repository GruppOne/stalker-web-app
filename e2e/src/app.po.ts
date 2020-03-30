import {browser, by, element} from 'protractor';

export class AppPage {
  public async navigateTo(): Promise<string> {
    return browser.get('/');
  }
  async getLoginText(): Promise<string> {
    return element(by.tagName('h1')).getText();
  }
}
