import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public uS : UsersService) {
    this.uS.vehicle();
    console.log(this.uS.vechiles);
    
    if(this.uS.loggedIn()){
      this.uS.autologin()
    }
   } 
} 
