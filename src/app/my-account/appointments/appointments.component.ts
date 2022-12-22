import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  myappointments : any;
  id:any;
  user?: User | any;
  constructor(private api:ApiService, private userService: UserService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);
    this.getAllAppointments(this.user.user.id);
  }
   getAllAppointments(id:any){
    this.api.getAppointmentsbyId(id).subscribe((data)=>{
      this.myappointments = data;
      console.log(this.myappointments);
      })
  
   }

   logout(){
    this.auth.logout()
  }
}
