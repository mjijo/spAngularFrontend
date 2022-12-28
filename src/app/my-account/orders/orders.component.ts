import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  myorders: any;
  id:any;
  user?: User | any;

  constructor(private api: ApiService, private userService: UserService, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);

    this.getAllOrders(this.user.user.id);
  }
  getAllOrders(id:any) {
    this.api.getOrdersbyUserId(id).subscribe((data)=>{
    this.myorders = data;
    console.log(this.myorders);
    })

  }
  logout(){
    this.auth.logout()
  }

}
