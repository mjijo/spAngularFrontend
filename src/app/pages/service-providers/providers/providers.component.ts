import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  public serviceproviders : any;

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.api.getserviceproviders().subscribe((data) => {
      this.serviceproviders = data;
    });
  }

}
