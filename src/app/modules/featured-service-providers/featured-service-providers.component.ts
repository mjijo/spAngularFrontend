import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-featured-service-providers',
  templateUrl: './featured-service-providers.component.html',
  styleUrls: ['./featured-service-providers.component.scss']
})
export class FeaturedServiceProvidersComponent implements OnInit {

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
// catid: number = 1
isLoading: boolean = true;


constructor(
  private api : ApiService, 
  private router: Router, 
  private actRoute: ActivatedRoute) 
  { }


  ngOnInit(): void {
    this.getProductCatId();
  }
  getProductCatId () {
    this.api.getFeaturedServiceproviders().subscribe((data) =>{

     
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
      console.log(this.bidsList);
      this.isLoading = false;
      console.log(data);
      console.log(this.bidsList);
    })
  }

}
