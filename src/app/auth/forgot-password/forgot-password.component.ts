import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPass!: FormGroup;

  constructor(private api:ApiService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.forgotPass = this.formbuilder.group({
      username: ['', Validators.required ]
    });
  }
  
  forgot(){
    if(this.forgotPass.valid){
      console.log(this.forgotPass.value);
      this.api.forgotPassword(this.forgotPass.value)
      .subscribe({
        next:(res)=>{
          alert(res.message.message)
        },
  error:(err)=>{
    alert(err.error.message)
  }
  
      })
      
    }else {
      console.log("The email is empty");
      this.validateAllFormFields(this.forgotPass)
     
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
