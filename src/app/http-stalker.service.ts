import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Organization} from './organization';
import {Place} from './place';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpStalkerService {
  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response',
  };
  constructor(public http: HttpClient) {}
  fakepost(apiURL: string, user: User): any {
    return this.http.post(apiURL, user, this.httpOptions);
  }

  fakeAddOrganization(apiURL: string, organization: Organization): any {
    return this.http.post(apiURL, organization, this.httpOptions);
  }

  fakeAddPlace(apiURL: string, place: Place): any {
    return this.http.post(apiURL, place, this.httpOptions);
  }
}
