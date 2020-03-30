import {Injectable} from '@angular/core';
import {environment} from './../environments/environment';
import {HttpStalkerService} from './http-stalker.service';
import {Organization} from './organization';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  organizationURL = environment.apiUrl + '/organization';

  constructor(private httpStalker: HttpStalkerService) {}

  /* add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  } */
  getOrganizationById(organizationId: number): Observable<HttpResponse<Organization>> {
    return this.httpStalker
      .getOrganizationById(this.organizationURL + '/' + organizationId.toString())
      .pipe(catchError(this.handleError<any>([])));
  }

  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
