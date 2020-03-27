import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HttpStalker {
  httpOptions: any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response',
  };
  public constructor(public http: HttpClient) {}
  fakepost(apiURL: string, user: User): any {
    return this.http.post(apiURL, user, this.httpOptions);
  }
}
