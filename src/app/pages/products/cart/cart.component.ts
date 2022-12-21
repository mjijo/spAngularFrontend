import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products : any = [];
  public grandTotal: number = 0;
  public totalItem : number = 0;

  constructor(private cartService: CartService) { }

  async ngOnInit(){
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
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  loadCartItems(){
    this.cartService.getCartItems().subscribe (item =>{
      console.log(item);
    })
  }
}
