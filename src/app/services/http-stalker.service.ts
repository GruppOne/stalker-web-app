import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class HttpStalkerService {
  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response',
  };
  constructor(public http: HttpClient) {}
  userPost(apiURL: string, user: User): any {
    return this.http.post(apiURL, user, this.httpOptions);
  }
}
