import {User} from './user';
import {UserData} from './user-data';

describe('User', () => {
  let user: User;
  beforeEach(() => {
    user = new User();
  });
  it('should create an instance', () => {
    expect(user).toBeTruthy();
  });
  it('should get Id', () => {
    expect(user.getId()).toEqual(-1);
  });
  it('should get email', () => {
    expect(user.getEmail()).toEqual('default');
  });
  it('should get password', () => {
    expect(user.getPassword()).toEqual('default');
  });
  it('should get userData', () => {
    expect(user.getUserData()).toBeTruthy();
  });
  it('should set Id', () => {
    user.setId(0);
    expect(user.getId()).toEqual(0);
  });
  it('should set email', () => {
    user.setEmail('notDefault');
    expect(user.getEmail()).toEqual('notDefault');
  });
  it('should set password', () => {
    user.setPassword('notDefault');
    expect(user.getPassword()).toEqual('notDefault');
  });
  it('should set userData', () => {
    const userDataNotDefault = new UserData('Fabio');
    user.setUserData(userDataNotDefault);
    expect(user.getUserData()).toEqual(userDataNotDefault);
  });
});
