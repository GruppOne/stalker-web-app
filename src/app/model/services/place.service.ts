import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClientService} from './http-client.service';
import {Place} from '../classes/places/place';
import {PlaceData} from '../classes/places/place-data';
import {map} from 'rxjs/operators';

export interface Geocoding {
  display_name: string;
  address: {
    building?: string;
    university?: string;
    school?: string;
    city: string;
    country: string;
    postcode: string;
    road: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  // private readonly stalkerEndpoint: StalkerEndpoint;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpClientService: HttpClientService,
  ) {
    // this.stalkerEndpoint = new StalkerEndpoint(httpClient, '/place');
  }

  reverseGeocoding(lat: number, lng: number): Observable<Geocoding> {
    return this.httpClient.get<Geocoding>(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
  }

  getOrgPlaces(orgId: number): Observable<Place[]> {
    return this.httpClientService
      .get<Place[]>(`/organization/${orgId}/places`)
      .pipe(map((response: HttpResponse<Place[]>) => response.body as Place[]));
  }

  addOrgPlace(orgId: number, newPlace: PlaceData): Observable<boolean> {
    return this.httpClientService
      .post<PlaceData>(`/organization/${orgId}/places`, newPlace)
      .pipe(map(() => true));
  }

  updateOrgPlace(orgId: number, updatedPlace: Place): Observable<boolean> {
    return this.httpClientService
      .put<Place>(`/organization/${orgId}/place/${updatedPlace.id}`, updatedPlace)
      .pipe(map(() => true));
  }

  deleteOrgPlace(orgId: number, placeId: number): Observable<boolean> {
    return this.httpClientService
      .delete<Place>(`/organization/${orgId}/place/${placeId}`)
      .pipe(map(() => true));
  }
}
