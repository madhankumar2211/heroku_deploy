import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  specifiedUser :any;
  allorder : any;

  constructor( public ps : ProfileService,
              public router : Router,
              public uS : UsersService,
              public ur : ActivatedRoute) 
              { 
                this.ur.data.subscribe((data) => {
                  this.specifiedUser = data.user
                  this.allorder = data.order
                })
              }
  user:any;
  count : boolean = true;
  completed : boolean = true; 
  cancelled : boolean = true; 
  psw:any;
  
  ngOnInit(): void {
    const p: any = '*'
    this.psw = p.repeat(5)
    // this.ps.getallorder().subscribe((o)=>{
    //   this.allorder = o;
      this.allorder.forEach(element => {
        if(element.Record_status == 1){
          this.count = false
        }else if (element.Record_status == 0){         
          this.completed = false
        }
        else{
          this.cancelled = false
        }
        
      });
      
    // })
    
  }

  editprofile(){
    
    this.router.navigate(['/Update']);
  }
  cancel(x){
    this.ps.cancelorder(x).subscribe((data) => {
      
      window.location.reload();
      
    })
    
  }

}
