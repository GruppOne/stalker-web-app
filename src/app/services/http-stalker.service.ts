import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {User} from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class HttpStalkerService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response',
  };
  constructor(public http: HttpClient) {}
  userPost(apiURL: string, user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(apiURL, user, this.httpOptions);
  }
}
