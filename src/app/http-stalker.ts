import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HttpStalker {
  public constructor(public http: HttpClient) {}
  fakepost(apiURL: string, user: User, httpOptions: any): any {
    return this.http.post(apiURL, user, httpOptions);
  }
}
