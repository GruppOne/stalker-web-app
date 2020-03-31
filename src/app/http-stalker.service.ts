import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user';
import {Organization} from './organization';
import {Place} from './place';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpStalkerService {
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response' as 'response',
  };
  constructor(public http: HttpClient) {}
  fakepost(apiURL: string, user: User): any {
    return this.http.post(apiURL, user, this.httpOptions);
  }

  fakeAddOrganization(apiURL: string, organization: Organization): any {
    return this.http.post(apiURL, organization, this.httpOptions);
  }

  getOrganizationById(apiURL: string): Observable<HttpResponse<Organization>> {
    return this.http.get<Organization>(apiURL, this.httpOptions);
  }

  getPlaceById(apiURL: string): Observable<HttpResponse<Place>> {
    return this.http.get<Place>(apiURL, this.httpOptions);
  }
}
