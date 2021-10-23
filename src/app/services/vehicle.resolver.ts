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
export class VehicleResolver implements Resolve<boolean> {

  constructor(public uS:UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    var vehicles = this.uS.vehicle().subscribe((data) => {  
      return data 
    })
    return of(vehicles);
  }
}
