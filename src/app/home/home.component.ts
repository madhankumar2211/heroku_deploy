import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public uS : UsersService) { 
    this.uS.vehicle();
    this.uS.loggedUser().subscribe((data) => {
      console.log(data);
      
      this.uS.user = data
    })
  }

  ngOnInit(): void {  
    this.uS.vehicle();
    console.log(this.uS.vechiles);
    
  }

}
