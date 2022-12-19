import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  packageList !: any;

  constructor(private api:ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getPackages();
  }
  getPackages(){
    this.api.packages().subscribe((data)=>{
      this.packageList = data;
      console.log(data);
    }
    )
  }
}
