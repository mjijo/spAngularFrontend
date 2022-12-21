import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyARecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import {CartService }from 'src/app/services/cart.service'
import { PluginsService } from 'src/app/services/plugins.service';
@Component({
  selector: 'app-bid-detail',
  templateUrl: './bid-detail.component.html',
  styleUrls: ['./bid-detail.component.scss']
})
export class BidDetailComponent implements OnInit {
error!: any;
  id:any;
  bidData:any;
  isLoggedin : boolean = false;
  placeBidData:any = {product_id:null, amount :0}

  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute, private cartService:CartService, private plugin: PluginsService) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.placeBidData.product_id =this.id;
      
    });
    this.getServiceProviderById(this.id);
  }
  getServiceProviderById(id:any){
    this.api.getProductDetails(id).subscribe((data)=>{
      
      data.proAttachments = [];
      console.log(data)
      for (let property in data.attachments) {
        console.log(`${property}: ${data.attachments[property]}`);
        data.proAttachments.push(data.attachments[property]);
      }
      this.bidData =data;

    });
    }
    BidNow(bidData : any){
      if(this.isLoggedin ==false) {
        this.plugin.showAlert('warning','Blocked','Please login first to download');
       }
      else {
      console.log(this.placeBidData);
      this.api.placeAbid(this.placeBidData)
      .subscribe({
        next:(res)=>{
          this.plugin.showAlert('success','Done','Your bid was placed successful');
        }
        
      })
    } 

          
    }
  // AddtoCart(proData : any){
  //   console.log(this.cartData);
  //   this.cartService.addProductToCart(this.cartData).subscribe(() =>{
  //    console.log(proData); 
  //   })
  //   this.cartService.addtoCart(proData);
  // }

}
