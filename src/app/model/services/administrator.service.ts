import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {HttpClientService} from './http-client.service';

export interface AdminGetType {
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class AdministratorService {
  constructor(private readonly httpClientService: HttpClientService) {}

  manageAdministrator(
    organizationId: number,
    administratorEmail: string,
  ): Observable<HttpResponse<string>> {
    return this.httpClientService.put<string>(
      `organizations/${organizationId}`,
      administratorEmail,
    );
  }

  getAdministrators(organizationId: number): Observable<HttpResponse<AdminGetType[]>> {
    return this.httpClientService.get<AdminGetType[]>(`organizations/${organizationId}`);
  }
}
