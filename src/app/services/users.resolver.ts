import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import { catchError } from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersResolver implements Resolve<boolean> {
  constructor(private http: HttpClient,public uS:UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.uS.loggedUser().pipe(
      catchError(err => {
        alert('Your session is expired.Please login again')
        this.uS.logout();
        return of(null);
      })
    )

  }
}
