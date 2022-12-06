import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id:any;
  proData:any;
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }


  ngOnInit(): void {
    
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getServiceProviderById(this.id);
  }
    getServiceProviderById(id:any){
    this.api.getProductDetails(id).subscribe((data)=>{
      this.proData =data;

    });
    }
  AddtoCart(){
   
  }
  }
 
    
      
  
  