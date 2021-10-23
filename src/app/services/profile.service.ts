import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient, public ar: ActivatedRoute) { }

  // getAllUser(){
  //   return this.http.get("http://localhost:7060/userlist")
  // }
  //profile
  getSpecifiedUser() {
    return this.http.get("/user")
  }



  updateuser(user: any) {
    //console.log('user id::', user._id);
    return this.http.put(`/updateuser/${user._id}`, user);
  }
  //order
  getallorder() {
    return this.http.get(`/vieworder`);
  }

  cancelorder(order) {
    //console.log("order id :: ", order._id);
    return this.http.put("/updateorder", order);
  }

  //contact us
  add(x: any) {
    return this.http.post<any>('/contactinfo', x);
  }
  //tracking
  getListOne(tid){
    //console.log(tid);
    
    return this.http.post<any>('/tracking',tid)
  }
}
