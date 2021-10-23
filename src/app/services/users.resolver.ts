import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<boolean> {
  constructor(private http: HttpClient,public uS:UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    var users = this.uS.loggedUser().subscribe((data) => {    
      return data
    })
    return of(users);
  }
}
