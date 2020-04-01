import {UserDataBuilder} from './user-data';

describe('UserData', () => {
  let userDataBuilder: UserDataBuilder;
  beforeEach(() => {
    userDataBuilder = new UserDataBuilder('Mario');
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
    userDataBuilder.setFirstName(newFirstName);
    userDataBuilder.setLastName(newLastName);
    userDataBuilder.setBirthDate(newBirthDate);
    userDataBuilder.setCreatedDate(newCreatedDate);
    userDataBuilder.setLastModifiedDate(newLastModifiedDate);
    const userData = userDataBuilder.build();
    expect(userData.firstName).toEqual(newFirstName);
    expect(userData.lastName).toEqual(newLastName);
    expect(userData.birthDate).toEqual(newBirthDate);
    expect(userData.createdDate).toEqual(newCreatedDate);
    expect(userData.lastModifiedDate).toEqual(newLastModifiedDate);
  });
});
