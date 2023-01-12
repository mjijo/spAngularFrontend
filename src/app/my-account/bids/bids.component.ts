import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit {

  mybids: any;
  id:any;
  user?: User | any;

  constructor(private api: ApiService, private userService: UserService, private auth:AuthenticationService) { }

  ngOnInit(): void {

    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);

    this.getAllBids(this.user.user.id);
  }
  getAllBids(id:any) {
    this.api.getBidsbyUserId(id).subscribe((data)=>{
    this.mybids = data;
    console.log(this.mybids);
    })

  }

deleteBid(item:any){
  this.api.deleteBidsbyUserId(item.id).subscribe(()=>{

    this.getAllBids(this.user.user.id);

  })
}

  logout(){
    this.auth.logout()
  }
}
