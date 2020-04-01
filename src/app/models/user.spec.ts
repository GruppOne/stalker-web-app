import {UserBuilder} from './user';
import {UserDataBuilder} from './user-data';
// import {UserData} from './user-data';

describe('User', () => {
  let userBuilder: UserBuilder;
  beforeEach(() => {
    userBuilder = new UserBuilder('default@email', 'Default1!');
  });
  it('should create an instance', () => {
    expect(userBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newMail = 'marcoverdi@gmail.com';
    const newPassword = 'NewPass';
    const newUserData = new UserDataBuilder('Marco').build();
    userBuilder.setEmail(newMail);
    userBuilder.setPassword(newPassword);
    userBuilder.setUserData(newUserData);
    const user = userBuilder.build();
    expect(user.id).toEqual(user.id);
    expect(user.email).toEqual(newMail);
    expect(user.password).toEqual(newPassword);
    expect(user.userData).toEqual(newUserData);
  });
});
