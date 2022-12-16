import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup ,Validators,FormControl, AbstractControl} from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { Validation } from './password-validators';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-individual-registration',
  templateUrl: './individual-registration.component.html',
  styleUrls: ['./individual-registration.component.scss']
})
export class IndividualRegistrationComponent implements OnInit {
  signUpIndividual! : FormGroup;
  allCountries! : any;
  serviceCategories! : any;
  allProductsCategories! : any;
  submitted = false;
  repeatPass: string ='none';

  error!: any;
  extraerror : any= null;
  message: any;
  phoneerror: any;
  isSuccessful = false;
  loading = false;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signUpIndividual = this.fb.group({
      first_name:["", [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z].*')
      ]],
      last_name: ["", [
        Validators.required, 
        Validators.minLength(3)]],
      email:["", [
        Validators.required, 
        Validators.email]],
      // phone:["", [
      //   Validators.required,
      //   Validators.pattern('[0-9]*'), 
      //   Validators.minLength(10), 
      //   Validators.maxLength(10)]],
      // password: ["", [Validators.required, Validators.minLength(10), 
      //   Validators.maxLength(15)]],
      // password_confirmation: new FormControl("",[Validators.required]),
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          
        ]
      ],
      password_confirmation: ['', Validators.required],
      // acceptTerms: [false, Validators.requiredTrue]
    }
    );
 
  }
 
 
   
  register(){
   
    if(this.signUpIndividual.valid){
      console.log(this.signUpIndividual.value);
      
      this.loading = true;
      this.api.registerUser(this.signUpIndividual.value)
     .subscribe({
      next:(res)=>{
        this.isSuccessful = true;
        // alert(res.message.message)
        Swal.fire({
          icon: 'success',
          title: 'DONE',
          text: 'Your registration is successful!',
          
        })
      },
error:(err)=>{
  this.loading = false;
  console.log (err.error.errors.password);
  this.error = (err.error.errors.email);
  this.phoneerror = (err.error.errors.phone);
  this.extraerror = ("password" in err.error ? err.error.password : null)
  console.log(this.extraerror)
  if("errors" in err.error){
    if("password" in err.error.errors){
      this.extraerror = err.error.errors.password[0]
    }
    
  }
  // this.message = this.error.message;
}

    })
      

    }else {
      console.log("The form is incomplete");
      this.validateAllFormFields(this.signUpIndividual)
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

