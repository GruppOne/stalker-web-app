import {Injectable} from '@angular/core';
import {environment} from './../environments/environment';
import {HttpStalker} from './http-stalker';
import {Place} from './place';
import {catchError} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  placeURL = environment.apiUrl + '/place';

  constructor(private httpStalker: HttpStalker) {}

  add(place: Place): any {
    return this.httpStalker
      .fakeAddPlace(this.placeURL, place)
      .pipe(catchError(this.handleError<any>([])));
  }

  handleError<T>(result: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result);
    };
  }
}
