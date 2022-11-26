import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signIn !: FormGroup;

  constructor(private formbuilder: FormBuilder , private api: ApiService, private http : HttpClient, private router: Router ) { }

  ngOnInit(): void {

   this.signIn = this.formbuilder.group({
    username:[''],
    password:['']
   })

  }

  initForm() {
    this.signIn = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  loginProcess() {
  //  this.api.login()
   this.http.get<any>("https://dis.opirth.com/api/auth/login/")

   .subscribe(
    res=>{
      const user = res.find((a:any)=>{
        return a.username === this.signIn.value.username && a.password === this.signIn.value.password
      });
      if(user){
        alert("Login Success");
        this.signIn.reset();
        this.router.navigate(['myaccount'])
      }else {
        alert("user not Found!!")
      }
    },err=> {
      alert("Something went Wrong!!")
    } )
    
  }
}
