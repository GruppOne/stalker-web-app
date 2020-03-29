import {Injectable} from '@angular/core';
import {HttpStalkerService} from './http-stalker.service';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = environment.apiUrl + '/user';
  constructor(private httpStalkerService: HttpStalkerService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserById(id: number): any {
    return this.httpStalkerService.getUserById(this.userUrl + '/' + id.toString());
  }
}
