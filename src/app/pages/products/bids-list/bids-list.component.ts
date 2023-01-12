import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PluginsService } from 'src/app/services/plugins.service';

@Component({
  selector: 'app-bids-list',
  templateUrl: './bids-list.component.html',
  styleUrls: ['./bids-list.component.scss']
})
export class BidsListComponent implements OnInit {

  public bidsList : any;
  public bidsListLoaded: boolean = false;
  public catid:any;
  public filters: any = {
    min_price: 10000,
    max_price: 2000000,
    category_id: null,
    auctioneer_id: null,
    year: null,
    auction_type: null,
    keyword: null
  }

  constructor(
    private api : ApiService, 
    private router: Router, 
    private actRoute: ActivatedRoute,
    private pluginService: PluginsService) 
  {
    //
  }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.catid = params.get('id');
      console.log(this.catid);
     });

     this.getProductCatId(this.catid);
     setTimeout(() => {
      this.pluginService.initRangeSlider();
     }, 5000);
  }

  getProductCatId (id:any) {
    this.api.listProductsById(id).subscribe((data) =>{
      // set filtered = false on each item to enable filtering
      data.forEach((bid:any) => {
        bid.show = true;
      });      if( Array.isArray(data) ){
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
      this.bidsListLoaded = true;
      console.log(data.id);
      console.log(this.bidsList)
    })
  }

  filterBids(filters:any, mode:string){
    
    if(mode == 'price'){
      // console.log('Price Filters >',filters);
      this.bidsList.forEach((bid:any) => {
        // loop through all bids and change display of items not in price range
        this.bidsList.forEach((bid:any) => {
          bid.show = (bid.sum_insured < filters.min_price || bid.sum_insured > filters.max_price ? false : true);
        });
      });
    }

    if(mode == 'general'){
      console.log('General Filters >',filters);
    }
    
  }

}
