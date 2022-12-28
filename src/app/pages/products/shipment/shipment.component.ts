import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {

  // public products : any = [];
  orders:any;
  id: any;
  shipment: any;
  
  constructor(
    private cartService: CartService,
    private router: Router, 
    private actRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      
  
    });
    this.updateOrder(this.id);
  }

  updateOrder(id:any){
    // this.loading = true;
    this.cartService.getShipmentDetails(id).subscribe ((item) =>{
      let id:any = localStorage.getItem('id');
    //  this.products = item.items;
    // this.router.navigate(['/shipment']);
     console.log(id);
    })
  }

}
