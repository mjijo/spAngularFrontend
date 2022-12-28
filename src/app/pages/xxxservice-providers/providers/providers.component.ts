import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  serviceproviders : any;
  catid:any


  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
   this.actRoute.paramMap.subscribe(params => {
    this.catid = params.get('id');
    console.log(this.catid);
   });
   this.getServicesCatId(this.catid);
  }

getServicesCatId (id:any) {
  this.api.listServicesById(id).subscribe((data) =>{
    this.serviceproviders =data;
    console.log(data);
  })
}
   
}
