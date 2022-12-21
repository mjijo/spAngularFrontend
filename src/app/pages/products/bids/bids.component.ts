import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class AllBidsComponent implements OnInit {
  
  bidsList : any;
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

     

      this.bidsList = data;
      console.log(data.id);
      console.log(this.bidsList.name)
    })
  }

}
