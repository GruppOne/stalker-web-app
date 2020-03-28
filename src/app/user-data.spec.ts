import {UserData} from './user-data';

describe('UserData', () => {
  let userData: UserData;
  beforeEach(() => {
    userData = new UserData();
  });
  it('should create an instance', () => {
    expect(userData).toBeTruthy();
  });

  // GET tests
  it('should get firstName', () => {
    expect(userData.getFirstName()).toEqual('Mario');
  });
  it('should get lastName', () => {
    expect(userData.getLastName()).toEqual('Rossi');
  });
  it('should get BirthDate', () => {
    expect(userData.getBirthDate()).toEqual('1980-01-01');
  });
  it('should get created date', () => {
    expect(userData.getCreatedDate()).toEqual('1980-01-01T09:01:01Z');
  });
  it('should get last modified date', () => {
    expect(userData.getLastModifiedDate()).toEqual('1980-01-01T09:01:01Z');
  });

  // SET tests
  it('should set first name', () => {
    userData.setFirstName('Fabio');
    expect(userData.getFirstName()).toEqual('Fabio');
  });
  it('should set last name', () => {
    userData.setLastName('notDefault');
    expect(userData.getLastName()).toEqual('notDefault');
  });
  it('should set birth date', () => {
    userData.setBirthDate('1993-02-20');
    expect(userData.getBirthDate()).toEqual('1993-02-20');
  });
  it('should set created date', () => {
    userData.setCreatedDate('1993-02-20T01:00:00Z');
    expect(userData.getCreatedDate()).toEqual('1993-02-20T01:00:00Z');
  });
  it('should set last modified date', () => {
    userData.setLastModifiedDate('1993-02-20T01:00:00Z');
    expect(userData.getLastModifiedDate()).toEqual('1993-02-20T01:00:00Z');
  });
});
