import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal: number = 0;
  public totalItem : number = 0;
  // cartData:any = {
  //   order_number:null, 
  //   user_id:null, 
  //   amount:null,
  //   company:null,
  //   email:null,
  //   phone: null,
  //   country_id:null ,
  //   Currency_id: null,
  //   Line_items:null,
  // }
  constructor(
    private cartService: CartService,
    private auth:AuthenticationService
    ) { }

  async ngOnInit(){
    this.createOrder(this.products);
    this.cartService.getProducts()
    .subscribe(res=>{
      this.loadCartItems();
      // this.products = res;
      // this.grandTotal = this.cartService.getTotalPrice();
      this.totalItem = res.length;
    })
   
    await this.loadItemCount();
  }
  async loadItemCount ()
  {
    await this.cartService.getCartTotalItems().subscribe((res :any) => {
      if(res){
        
      if('data' in res){
        this.products = res.data;
        res.data.forEach((item:any) => {
          this.grandTotal += item.amount;
          
        });
        console.log(this.products);
        
      }

      }
        
    });
 

  }

  removeItem(item: any){
    this.cartService.removeCartItem(item.items);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe ((item : any) =>{
      console.log(item);
      this.products = item.items;
    });
  }

  createOrder(product : any){
    this.cartService.postCartDataToOrder(this.products).subscribe (item =>{
    //  this.products = item.items;
     console.log(this.products)
    })
  }

}
