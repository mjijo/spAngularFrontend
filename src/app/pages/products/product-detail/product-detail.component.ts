import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnyARecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import { CartService }from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PluginsService } from 'src/app/services/plugins.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id:any;
  proData:any;
  cartData:any = {product_id:null, quantity :0}
  productIsLoaded:boolean = false;
  isLoggedin : boolean = false;

  constructor(
    private api : ApiService, 
    private router: Router, 
    private actRoute: ActivatedRoute, 
    private cartService:CartService,
    private auth:AuthenticationService,
    private plugin: PluginsService
  ) 
  { }


  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.cartData.product_id =this.id;
    });
    this.getServiceProviderById(this.id);
    this.isLoggedin = this.auth.checkUser();
  }

  getServiceProviderById(id:any){

    // if user is not logged in, show alert else add to cart
    if(this.isLoggedin == false) {
      this.plugin.showAlert('warning','Blocked','Please login first to download');
    }else{
      this.api.getProductDetails(id).subscribe((data)=>{
        data.proAttachments = [];
        console.log(data)
        for (let property in data.attachments) {
          console.log(`${property}: ${data.attachments[property]}`);
          data.proAttachments.push(data.attachments[property]);
        }
        this.proData =data;
        this.productIsLoaded = true;
      });
    }
    
  }

  AddtoCart(proData : any){
    // console.log(this.cartData);
    this.cartService.addProductToCart(this.cartData).subscribe(() =>{
      // console.log(proData);
      console.log(this.cartData);
    })
    this.cartService.addtoCart(proData);
  }

}
 
    
      
  
  