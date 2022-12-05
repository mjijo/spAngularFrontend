import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService  } from 'src/app/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loading = false;
  user?: User | null;

  constructor(private userService: UserService, private api:AuthenticationService) { }

  ngOnInit(): void {
    this.api.user.subscribe(x => this.user = x);
  }
  logout(){
    this.api.logout()
  }
}
