import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signIn!: FormGroup;
username: any;

  constructor(private formbuilder: FormBuilder , private api: ApiService, private router:Router ) { }

  ngOnInit(): void {

   this.signIn = this.formbuilder.group({
    username: ['', Validators.required ],
    password:['', Validators.required ]
   });

  }

 
  login() {
  //  this.api.login()
  if(this.signIn.valid){
    console.log(this.signIn.value);

    this.api.loginUser(this.signIn.value)
     .subscribe({
      next:(res)=>{
        this.router.navigate(['/myaccount']);
        alert(res.message.message)
      },
error:(err)=>{
  alert(err.error)
}

    })

  }else {
    console.log("Wrong");
    this.validateAllFormFields(this.signIn)
   
  }
  
   
  }

  private validateAllFormFields(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if (control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}
