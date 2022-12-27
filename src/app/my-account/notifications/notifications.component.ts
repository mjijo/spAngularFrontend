import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  mynotifications:any;
  id:any;
  user?: User | any;

  constructor(private api:ApiService, private userService: UserService, private auth:AuthenticationService) { }

  ngOnInit(): void {

    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);
    
    this.getAllNotifications(this.user.user.id);
  }

  getAllNotifications(id:any){
    this.api.getQuotationbyUserId(id).subscribe((data)=>{
      this.mynotifications = data;
      console.log(this.mynotifications);
    })
  }
  
  logout(){
    this.auth.logout()
  }

}
