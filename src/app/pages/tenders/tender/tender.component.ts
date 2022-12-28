import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PluginsService } from 'src/app/services/plugins.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  id:any;
  tenderData:any;
  isLoggedin : boolean = false;

  constructor(private api:ApiService, private router:Router, private actRoute: ActivatedRoute, private auth:AuthenticationService, private plugins:PluginsService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getTenderById(this.id);
    this.isLoggedin = this.auth.checkUser();
  }

  getTenderById(id:any){
    this.api.getTenderDetails(id).subscribe((data)=>{
     
      data.tenderAttachments = [];
      console.log(data)
      for (let property in data.attachments) {
        console.log(`${property}: ${data.attachments[property]}`);
        data.tenderAttachments.push(data.attachments[property]);
      }
      this.tenderData = data;
      console.log(this.tenderData);

      // Object.keys(this.tenderData).forEach(prop => {
      //   console.log(prop);
      //   console.log(this.tenderData[prop]);
      // });
    })
  }
  downloadTenderBtn(){
  
   if(this.isLoggedin ==false) {
    this.plugins.showAlert('warning','Blocked','Please login first to download');
   }
  }
}
