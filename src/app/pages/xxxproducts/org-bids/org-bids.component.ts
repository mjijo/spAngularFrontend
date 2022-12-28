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
      if( Array.isArray(data) ){
        // loop through the data so we can access each object
        data.forEach((bid:any) => {
          bid.images = [];
          // check for attachments in the product
          if( 'attachments' in bid ){
            // loop through the attachemnts object and get the image details to push to the images array
            for (let property in bid.attachments) {
              bid.images.push( {image_url: bid.attachments[property].original_url, name: bid.attachments[property].name} );
            }
          }
        });
      }
      console.log(this.bidList.data);
    });
  }

}
