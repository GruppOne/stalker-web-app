import {User} from './user';
import {UserData} from './user-data';
// import {UserData} from './user-data';

describe('User', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
  });
  it('should create an instance', () => {
    expect(user).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newId = -2;
    const newMail = 'marcoverdi@gmail.com';
    const newPassword = 'NewPass';
    const newUserData = new UserData('Marco', 'Verdi');
    user.Id = newId;
    user.Mail = newMail;
    user.Password = newPassword;
    user.UserData = newUserData;
    expect(user.Id).toEqual(newId);
    expect(user.Mail).toEqual(newMail);
    expect(user.Password).toEqual(newPassword);
    expect(user.UserData).toEqual(newUserData);
  });
});
