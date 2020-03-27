import {Injectable} from '@angular/core';
import {environment} from './../environments/environment';
import {HttpStalker} from './http-stalker';
import {Organization} from './organization';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  organizationURL = environment.apiUrl + '/organization';

  constructor(private httpStalker: HttpStalker) {}

  add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  }

  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
