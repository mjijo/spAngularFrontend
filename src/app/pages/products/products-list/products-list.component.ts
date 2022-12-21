import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  productList : any;
  catid:any

  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.catid = params.get('id');
      console.log(this.catid);
     });

     this.getProductCatId(this.catid);
  }

  getProductCatId (id:any) {
    this.api.listProductsById(id).subscribe((data) =>{
      // console.log(data);
      
      // check if data is an array
      if( Array.isArray(data) ){
        // loop through the data so we can access each object
        data.forEach((product:any) => {
          product.images = [];
          // check for attachments in the product
          if( 'attachments' in product ){
            // loop through the attachemnts object and get the image details to push to the images array
            for (let property in product.attachments) {
              product.images.push( {image_url: product.attachments[property].original_url, name: product.attachments[property].name} );
            }
          }
        });
      }
      this.productList =data;
      console.log(this.productList);

    })
  }
}
