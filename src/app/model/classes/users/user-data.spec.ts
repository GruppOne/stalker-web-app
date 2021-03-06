import {UserDataBuilder} from './user-data';

describe('UserData', () => {
  let userDataBuilder: UserDataBuilder;
  beforeEach(() => {
    userDataBuilder = new UserDataBuilder();
  });
  it('should create an instance', () => {
    expect(userDataBuilder.build()).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newFirstName = 'Marco';
    const newLastName = 'Verdi';
    const newBirthDate = '2020-01-01';
    const newCreatedDate = '2020-01-01T09:01:01Z';
    const newLastModifiedDate = '2020-01-01T09:01:01Z';
    userDataBuilder.addFirstName(newFirstName);
    userDataBuilder.addLastName(newLastName);
    userDataBuilder.addBirthDate(newBirthDate);
    userDataBuilder.addCreatedDate(newCreatedDate);
    userDataBuilder.addLastModifiedDate(newLastModifiedDate);
    const userData = userDataBuilder.build();
    expect(userData.firstName).toEqual(newFirstName);
    expect(userData.lastName).toEqual(newLastName);
    expect(userData.birthDate).toEqual(newBirthDate);
    expect(userData.creationDateTime).toEqual(newCreatedDate);
    expect(userData.lastChangeDateTime).toEqual(newLastModifiedDate);
  });
});
