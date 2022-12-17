import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {

tendersList : any;
catid:any;

  constructor(private api:ApiService, private router: Router, private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.actRoute.paramMap.subscribe(params => {
    //   this.catid = params.get('id');
    //   console.log(this.catid);
    //  });
    this.getTender();
  }

  getTender(){
    this.api.tenders().subscribe((data)=>{
      this.tendersList = data;
      console.log(data);
    }
    )
  }

}
