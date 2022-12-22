import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-org-bids',
  templateUrl: './org-bids.component.html',
  styleUrls: ['./org-bids.component.scss']
})
export class OrgBidsComponent implements OnInit {

  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }
  id:any;
  bidList:any;
  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    })
    this.getBidsbyorg(this.id);
    
  }

  getBidsbyorg(id:any){
    this.api.getProductByOrgId(id).subscribe((data)=>{
      this.bidList = data;

      console.log(this.bidList);
    });
  }

}
