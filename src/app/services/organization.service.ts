import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Organization} from '../models/organization';

import {StalkerHttpClientService} from './stalker-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  organizationURL = environment.apiUrl + '/organization';

  constructor(private httpStalker: StalkerHttpClientService) {}

  /* add(organization: Organization): any {
    return this.httpStalker
      .fakeAddOrganization(this.organizationURL, organization)
      .pipe(catchError(this.handleError<any>([])));
  } */
  getOrganizationById(organizationId: number): Observable<HttpResponse<Organization>> {
    return this.httpStalker
      .get<Organization>(this.organizationURL + '/' + organizationId.toString())
      .pipe(catchError(this.handleError<HttpResponse<Organization>>()));
  }

  handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
