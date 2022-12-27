import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent implements OnInit {
  myquotation:any;
  id:any;
  user?: User | any;
  constructor(private api:ApiService, private userService: UserService, private auth:AuthenticationService) { }

  ngOnInit(): void {

    this.auth.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user.id);
    
    this.getAllQuotation(this.user.user.id);
  }
  
getAllQuotation(id:any){
  this.api.getQuotationbyUserId(id).subscribe((data)=>{
    this.myquotation = data;
    console.log(this.myquotation);
  })
}

logout(){
  this.auth.logout()
}

}
