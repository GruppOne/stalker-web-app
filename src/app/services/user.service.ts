import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {User} from '../models/user';

import {HttpStalkerService} from './http-stalker.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.apiUrl + '/user';
  constructor(private httpStalkerService: HttpStalkerService) {}

  getUserById(id: number): Observable<HttpResponse<User>> {
    return this.httpStalkerService.getUserById(this.userUrl + '/' + id.toString());
  }
}
