import {LoginDataBuilder} from './login-data';

describe('LoginData', () => {
  let loginDataBuilder: LoginDataBuilder;
  beforeEach(() => {
    loginDataBuilder = new LoginDataBuilder('default@email', 'Default1!');
  });
  it('should create an instance', () => {
    expect(loginDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newMail = 'marcoverdi@gmail.com';
    const newPassword = 'NewPass';
    loginDataBuilder.addEmail(newMail);
    loginDataBuilder.addPassword(newPassword);
    const user = loginDataBuilder.build();
    expect(user.email).toEqual(newMail);
    expect(user.password).toEqual(newPassword);
  });
});
