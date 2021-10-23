import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  order : any;
  private URL = 'http://localhost:7080';
  isloggedin = new BehaviorSubject(false)
  user:any;


  constructor(public http: HttpClient,public router : Router) { }


  forgot(x) {
    return this.http.post('/forgot', x);
  }
  updatepassword(x) {
    return this.http.put('/updatepassword', x);
  }
  login(x) {
    return this.http.post<any>('/login', x);
  }
  register(x) {
    return this.http.post<any>('/register', x);
  }
  logout() {
    this.isloggedin.next(false)
    localStorage.removeItem('token');
    this.router.navigate(['/Login']);
  }

  loggedUser(){
    return this.http.get('/user');
  }
  autologin(){
    this.isloggedin.next(true)
  }

  loggedIn() {
    return localStorage.getItem('token');
  }
  
  getToken() {
    //console.log(localStorage.getItem('token'));
    
    return localStorage.getItem('token');
  }

  //-------------------------------------------------------------------

  profile() {
    return this.http.get('/Profile');
  }
  // book() {
  //   return this.http.get('/Payment')
  // }



  logoutuser() {
    this.isloggedin.next(false)
  }
  logoinuser() {
    this.isloggedin.next(true)
  }



  //order table

  add(x:any) {
    return this.http.post<any>('/booking', x);
  }
  addquote(y:any) {
    return this.http.post<any>('/insertquote', y);
  }
  vehicle(){
    return this.http.get<any>('/vehicleviewnew');
  }

  //payment
  addpayment(x:any) {
    return this.http.post<any>('/addpaymentinfo', x);
  }
}
