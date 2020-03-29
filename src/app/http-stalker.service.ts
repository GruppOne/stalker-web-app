/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';

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
}
