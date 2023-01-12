import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-reffered-clients',
  templateUrl: './reffered-clients.component.html',
  styleUrls: ['./reffered-clients.component.scss']
})
export class RefferedClientsComponent implements OnInit {

  constructor(private api: ApiService, private userService: UserService, private auth:AuthenticationService) { }
   myrefferals:any;
   id:any;
   user?: User | any;

  ngOnInit(): void {

    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);

    this.getAllReffered(this.user.user.id);
  }

  getAllReffered(id:any){
    this.api.getRefferalsbyUserId(id).subscribe((data)=>{
      this.myrefferals = data;
      console.log(this.myrefferals);
      })
  }

  logout(){
    this.auth.logout()
  }

}
