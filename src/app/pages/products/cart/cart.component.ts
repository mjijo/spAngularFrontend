import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal: number = 0;
  public totalItem : number = 0;
  loading = false;
  id:any;
  
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
    private auth:AuthenticationService,
    private router: Router,
    ) { }

  async ngOnInit(){
   
    this.cartService.getProducts()
    .subscribe(res=>{
      this.loadCartItems();
      // this.products = res;
      // this.grandTotal = this.cartService.getTotalPrice();
      this.totalItem = res.length;
      console.log(res)
    })
   
    await this.loadItemCount();
   
  }
  async loadItemCount ()
  {
    await this.cartService.getCartTotalItems().subscribe((res :any) => {
      if(res){
        
      if('items' in res){
        this.products = res.items;
        res.items.forEach((item:any) => {
          this.grandTotal += item.amount;
          this.totalItem += item.quantity;
     
        });
        console.log(this.products);
        
      }

      }
      
    });
 

  }

  async removeItem(item: any){
    this.cartService.removeCartItem(item.id)
    .subscribe(()=> {
      this.loadCartItems();
      console.log('true');
  });
   
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe ((item : any) =>{
      console.log(item.amount);
      this.products = item.items;
      
    });
  }

  createOrder(product : any){
    this.loading = true;
    this.cartService.postCartDataToOrder(this.products).subscribe (item =>{
      
     this.id = item.id;
    this.router.navigate(['/shipment/',this.id]);
    // this.router.navigateByUrl("/shipment/"{item.id);
     console.log(this.id);
    })
  }

}
