import {UserData} from './user-data';

describe('UserData', () => {
  let userData: UserData;
  beforeEach(() => {
    userData = new UserData();
  });
  it('should create an instance', () => {
    expect(userData).toBeTruthy();
  });
  it('should set and get fields correctly', () => {
    const newFirstName = 'Marco';
    const newLastName = 'Verdi';
    const newBirthDate = '2020-01-01';
    const newCreatedDate = '2020-01-01T09:01:01Z';
    const newLastModifiedDate = '2020-01-01T09:01:01Z';
    userData.FirstName = newFirstName;
    userData.LastName = newLastName;
    userData.BirthDate = newBirthDate;
    userData.CreatedDate = newCreatedDate;
    userData.LastModifiedDate = newLastModifiedDate;
    expect(userData.FirstName).toEqual(newFirstName);
    expect(userData.LastName).toEqual(newLastName);
    expect(userData.BirthDate).toEqual(newBirthDate);
    expect(userData.CreatedDate).toEqual(newCreatedDate);
    expect(userData.LastModifiedDate).toEqual(newLastModifiedDate);
  });
});
