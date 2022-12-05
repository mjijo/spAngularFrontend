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

  product$!: Observable<any>
  
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
 
    const productSlug$ = this.actRoute.params.pipe(map((params: any) => params?.["slug"]))
    this.product$ = this.api.getServiceDetails(productSlug$).pipe(map(res => res))

  }
 
    
      
  
  

  
}