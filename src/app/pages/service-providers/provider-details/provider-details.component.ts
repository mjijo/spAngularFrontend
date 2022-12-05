import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map, Observable } from 'rxjs';
import { Sp } from 'src/app/interfaces/sp';
@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent implements OnInit {

  id:any;
  spdetails:any;
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
 
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getServiceProviderById(this.id);
  }
    getServiceProviderById(id:any){
    this.api.getserviceprovidersDetails(id).subscribe((data)=>{
      this.spdetails =data;

    });
  }

  }
 
    
      
  
  

  
