import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.scss']
})
export class TenderComponent implements OnInit {
  id:any;
  tenderData:any;

  constructor(private api:ApiService, private router:Router, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getTenderById(this.id)
  }

  getTenderById(id:any){
    this.api.getTenderDetails(id).subscribe((data)=>{
      this.tenderData = data;
      console.log(data)

      Object.keys(this.tenderData).forEach(prop => {
        console.log(prop);
        console.log(this.tenderData[prop]);
      });
    })
  }

}
