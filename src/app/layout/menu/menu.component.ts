import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allCountries !:any[];
  serviceCategories! : any;
  allProductsCategories! : any;
  public totalItem : number = 0;
  filterTerm!: string;
  

  constructor(private api : ApiService) { }
   
  ngOnInit(): void {
    // this.api.getCountries().subscribe((data) => {
    //   this.allCountries = data;
      
    // });
  
    this.api.getServicesCategory().subscribe((data) =>{
      this.serviceCategories = data;
    });

    this.api.getProducts().subscribe((data) =>{
      this.allProductsCategories = data;
    });
  }

  getcountries (event:any){
    const country = event.target.value;
    this.api.fetch(country).then((res:any) => {
      console.log(res);
      this.allCountries = res.data;
      console.log(this.allCountries);
    })
  }
  
}
