import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  public products : any = [];
  id: any;
  shipment: any;
  
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    
    this.updateOrder(this.id);
  }

  updateOrder(id:any){
    // this.loading = true;
    this.cartService.getCartItems().subscribe ((item) =>{
    //  this.products = item.items;
    // this.router.navigate(['/shipment']);
     console.log(item)
    })
  }

}
