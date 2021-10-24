import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  track:any;
  status:any;
  phone:any;
  bdate:any;
  ddate : any;
  bar:any;
  alldatas:any
  alldata: FormGroup;
  submitted : any;

  constructor(private fb: FormBuilder,public pS: ProfileService,public http: HttpClient,public router : Router) {}  
  
  ngOnInit(): void{
    this.alldata = this.fb.group({  
      tid: ['', Validators.required]
    })  
  }
  
  get fid(){  
    return this.alldata.controls['tid'];  
  }  
  getall(): void
  {
    this.submitted = true;
      this.pS.getListOne(this.alldata.value).subscribe((data) => {
        this.track = data["_id"];
        this.bdate = data.order_status["b_date"];
        this.status = data.order_status["status"];
        this.phone = data.order_status["phone"];
        this.ddate = data.order_status["d_date"];
        if(this.status == "Start"){
          this.bar = 32;
        }
        else if(this.status == "Processing")
        {
          this.bar = 70;
        }
        else{
          this.bar = 100;
        }
      })
  }
}
  

  

