import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bids-list',
  templateUrl: './bids-list.component.html',
  styleUrls: ['./bids-list.component.scss']
})
export class BidsListComponent implements OnInit {

  bidsList : any;
  catid:any
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.catid = params.get('id');
      console.log(this.catid);
     });

     this.getProductCatId(this.catid);
  }
  getProductCatId (id:any) {
    this.api.listProductsById(id).subscribe((data) =>{

     
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
      this.bidsList = data;
      console.log(data.id);
      console.log(this.bidsList)
    })
  }

}
