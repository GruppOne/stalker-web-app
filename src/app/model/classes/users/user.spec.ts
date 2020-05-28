import {UserBuilder} from './user';
import {UserDataBuilder} from './user-data';
// import {UserData} from './user-data';

describe('User', () => {
  let userBuilder: UserBuilder;
  beforeEach(() => {
    userBuilder = new UserBuilder();
  });
  it('should create an instance', () => {
    expect(userBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newUserData = new UserDataBuilder().addFirstName('Marco').build();
    userBuilder.addUserData(newUserData);
    const user = userBuilder.build();
    expect(user.id).toEqual(user.id);
    expect(user.data).toEqual(newUserData);
  });
});
