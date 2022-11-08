import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    public allsectors:any = [];
    public allcountries:any = [];
    public allservicecategories:any = [];
    public allproductcategories:any = [];
  
    constructor(private apiService: ApiService) { }
  
    async ngOnInit() {
      await this.getcountries();
      await this.getservicecategories();
      await this.getproductscategories();
      await this.getsectors();
    }
    
    async getcountries() {
      let endpoint: string = this.apiService.getEndpoints().settings.countries.get_all_countries;
      await this.apiService.get(endpoint).subscribe(
        (response:any) => {
          if(response){
            if ('data' in response) {
              this.allcountries = response.data;
              console.log('All Countries >',this.allcountries);
              
            }
          }
        },
        error => { 
          console.log('Countries Err Response >', error);
          
        }
      );
  
    }
    async getservicecategories() {
      let endpoint: string = this.apiService.getEndpoints().settings.service_categories.get_all_categories;
      await this.apiService.get(endpoint).subscribe(
        (response:any) => {
          if(response){
            if ('data' in response) {
              this.allservicecategories = response.data;
              console.log('service categories >',this.allservicecategories);
              
            }
          }
        },
        error => { 
          console.log('Services Err Response >', error);
          
        }
      ); 
    }
     
    async getproductscategories() {
      let endpoint: string = this.apiService.getEndpoints().settings.product_categories.get_all_product_categories;
      await this.apiService.get(endpoint).subscribe(
        (response:any) => {
          if(response){
            if ('data' in response) {
              this.allproductcategories = response.data;
              console.log('product categories >',this.allproductcategories);
              
            }
          }
        },
        error => { 
          console.log('Product categories Err Response >', error);
          
        }
      );
      
    } 
  
    async getsectors() {
      let endpoint: string = this.apiService.getEndpoints().settings.sectors.get_all_sectors;
      await this.apiService.get(endpoint).subscribe(
        (response:any) => {
          if(response){
            if ('data' in response) {
              this.allsectors = response.data;
              console.log('all sectors >',this.allsectors);
              
            }
          }
        },
        error => { 
          console.log('Sectors Err Response >', error);
          
        }
      );
    } 
    
  }
  