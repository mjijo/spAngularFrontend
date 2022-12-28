import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PluginsService } from 'src/app/services/plugins.service';
import { ApiService } from 'src/app/services/api.service';

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
  allCountries! : any;
  isSubmitted = false;
  
  constructor(
    private cartService: CartService,
    private router: Router, 
    private actRoute: ActivatedRoute, 
    private plugin: PluginsService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    
    this.api.getCountries().subscribe((data) => {
      this.allCountries = data;
    });               
                      
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      
  
    });
     this.updateOrder(this.id);
  }

  updateOrder(id:any){
    // this.loading = true;
    this.cartService.getShipmentDetails(id).subscribe ((item) =>{
     this.orders = item;
    //  this.products = item.items;
    // this.router.navigate(['/shipment']);
     console.log(this.orders);
    })
  }

  onSubmitUpdate(orders : any,id:any) {
    
    this.cartService.updateShipmentDetails(orders,orders.id)
    .subscribe({
      next:(res:any)=>{
        if(orders){
          orders.address = this.orders.address;
          orders.postal_code = this.orders.postal_code;
          orders.city = this.orders.city;
          orders.state = this.orders.state;
          // orders.country = this.orders.state;
          orders.address = this.orders.address;
          orders.delivery_method = this.orders.delivery_method;
          orders.payment_method = this.orders.payment_method;
        }
        console.log(orders);
        localStorage.setItem('user', JSON.stringify(orders));
        this.plugin.showAlert('success','DONE', 'Shipment Details submitted Successfully');
        this.router.navigate(['/']);
      },
      error:(err)=>{
        // alert(JSON.stringify(err.error));
        console.log (JSON.stringify(err.error));
        if("errors" in err.error){
          if("password" in err.error.errors){
            // if(Array.isArray()){}
            // this.extraerror = err.error.errors.password[0]
          }
          
        }
        this.plugin.showAlert('error','An Error Occured', 'Check if all your fields');
        
        // this.error = (JSON.stringify(err.error.message));
        // this.message = this.error.message;
      }
    });
    
}

}
