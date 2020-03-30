import {Injectable} from '@angular/core';
import {environment} from './../environments/environment';
import {HttpStalkerService} from './http-stalker.service';
import {Place} from './place';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placeURL = environment.apiUrl + '/place';

  constructor(private httpStalker: HttpStalkerService) {}

  add(place: Place): Observable<HttpResponse<Place>> {
    return this.httpStalker
      .addPlace(this.placeURL, place)
      .pipe(catchError(this.handleError<any>([])));
  }
  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
