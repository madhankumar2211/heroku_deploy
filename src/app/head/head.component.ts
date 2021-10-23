import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  loginstatus: boolean;

  constructor(public uS : UsersService,
    public router : Router) {
      this.uS.vehicle();
      console.log(this.uS.vechiles);
     }

  ngOnInit(): void {
    this.uS.vehicle();
    console.log(this.uS.vechiles);
    this.uS.isloggedin.subscribe((stat)=>{this.loginstatus=stat})
  }

  profile(){
    this.router.navigateByUrl('/Profile');
  }
  logout()
  {      
    this.uS.logout()
  }
}



