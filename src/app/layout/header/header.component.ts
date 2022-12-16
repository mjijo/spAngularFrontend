import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  signIn!: FormGroup;
 username: any;
 isLoggedIn : boolean =false;

  constructor(private formbuilder: FormBuilder , private api: ApiService, private router:Router, private auth:AuthenticationService) { }

  async ngOnInit() {

   this.isLoggedIn = this.auth.checkUser();
   console.log('Islogged in?', this.isLoggedIn);

  }

  headerlogout()
  {
    this.auth.logout();
    this.isLoggedIn = false;
    window.location.reload();
  }
  
  }

  
