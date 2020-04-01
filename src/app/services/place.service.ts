import {HttpResponse, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Place} from '../models/place';

import {StalkerHttpClientService} from './stalker-http-client.service';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placeURL = environment.apiUrl + '/place';

  constructor(private httpStalker: StalkerHttpClientService) {}

  getPlaceById(placeId: number): Observable<HttpResponse<Place>> {
    return this.httpStalker
      .get<Place>(this.placeURL + '/' + placeId.toString())
      .pipe(catchError(this.handleError<HttpResponse<Place>>()));
  }

  handleError<T>(result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
