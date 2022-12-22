import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-featured-motor-salvages',
  templateUrl: './featured-motor-salvages.component.html',
  styleUrls: ['./featured-motor-salvages.component.scss']
})
export class FeaturedMotorSalvagesComponent implements OnInit {

 
//carousel
customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 24,
    navSpeed: 700,
    navText: [' < ', ' > '],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      1366:{
        items: 4
      }
    },
    nav: true
  
}


  bidsList : any;
  catid: number = 1
  isLoading: boolean = true;

  constructor(
    private api : ApiService, 
    private router: Router, 
    private actRoute: ActivatedRoute) 
    { }

  ngOnInit(): void {
    

     this.getProductCatId(this.catid);
  }
  getProductCatId (id:any) {
    this.api.featuredMotorSalvage(id).subscribe((data) =>{

     
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
      this.isLoading = false;
      console.log(data.id);
      console.log(this.bidsList);
    })
  }

}
