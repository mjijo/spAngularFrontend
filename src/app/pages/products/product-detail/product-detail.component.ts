import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyARecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import {CartService }from 'src/app/services/cart.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id:any;
  proData:any;
  cartData:any = {product_id:null, quantity :1}

  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute, private cartService:CartService) { }


  ngOnInit(): void {
    
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cartData.product_id =this.id;
      
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
      this.proData =data;

    });
    }
  AddtoCart(proData : any){
    console.log(this.cartData);
    this.cartService.addProductToCart(this.cartData).subscribe(() =>{
     console.log(proData); 
    })
    this.cartService.addtoCart(proData);
  }
  }
 
    
      
  
  