import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Place} from '../classes/places/place';
import {PlaceData} from '../classes/places/place-data';

import {HttpClientService} from './http-client.service';

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

  getOrgPlaces(organizationId: number): Observable<Place[]> {
    return this.httpClientService
      .get<{places: Place[]}>(`/organization/${organizationId}/places`)
      .pipe(
        map(
          (response: HttpResponse<{places: Place[]}>) => response.body?.places as Place[],
        ),
      );
  }

  addPlaceToOrg(organizationId: number, newPlace: PlaceData): Observable<boolean> {
    return this.httpClientService
      .post<PlaceData>(`/organization/${organizationId}/places`, newPlace)
      .pipe(map(() => true));
  }

  updatePlaceInOrg(organizationId: number, newPlace: Place): Observable<boolean> {
    return this.httpClientService
      .put<Place>(`/organization/${organizationId}/place/${newPlace.id}`, newPlace)
      .pipe(map(() => true));
  }

  deletePlaceInOrg(organizationId: number, placeId: number): Observable<boolean> {
    return this.httpClientService
      .delete<Place>(`/organization/${organizationId}/place/${placeId}`)
      .pipe(map(() => true));
  }

  getOrgPlaceById(organizationId: number, placeId: number): Observable<Place> {
    return this.httpClientService
      .get<Place>(`/organization/${organizationId}/place/${placeId}`)
      .pipe(map((response: HttpResponse<Place>) => response.body as Place));
  }
}
