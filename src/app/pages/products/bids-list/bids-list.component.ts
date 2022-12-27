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
  public catid:any;
  public filters: any = {
    min_price: 10000,
    max_price: 2000000
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
      });
      this.bidsList = data;
      console.log(data.id);
      console.log(this.bidsList)
    })
  }

  filterBids(filters:any, mode:string){
    // console.log('Filters >',filters);
    if(mode == 'price'){
      this.bidsList.forEach((bid:any) => {
        // loop through all bids and change display of items not in price range
        this.bidsList.forEach((bid:any) => {
          bid.show = (bid.sum_insured < filters.min_price || bid.sum_insured > filters.max_price ? false : true);
        });
      });
    }
    
  }

}
