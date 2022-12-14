import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,FormControl, EmailValidator} from '@angular/forms';

import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUp! : FormGroup;
  allCountries! : any;
  serviceCategories! : any;
  allProductsCategories! : any;

  txtValue! :string;
  message! : string;
 
  buttonDisabled !: boolean;
owner_email: any;


  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
   
    this.signUp = this.fb.group({
      name: ['', Validators.required ],
      country_id:['', Validators.required ],
      industry_id:['', Validators.required ],
      // contact_email:['', Validators.required ],
      // contact_phone:['', Validators.required ],
      town:['', Validators.required ],
      zip_code:['', Validators.required ],
      // postal_code:['', Validators.required ],
      postal_address:['', Validators.required ],
      physiscal_address:['', Validators.required ],
      registration_number:[''],
      // registration_certificate:[''],
      tax_pin_number:[''],
      // tax_certificate:[''],
      
      // owner_last_name:['', Validators.required ],
      owner_first_name:['', Validators.required ],
      owner_email:['', Validators.required, [
        Validators.maxLength(250),
        Validators.minLength(5),
        Validators.pattern(/.+@.+\..+/)
     ]],
      owner_phone:['', Validators.required ],
      owner_password:['', Validators.required ],
      owner_password_confirmation:['', Validators.required ]
    
      // "owner[first_name]":['', Validators.required ],
      // "owner[email]":['', Validators.required ],
      // "owner[phone]":['', Validators.required ],
      // "owner[password]":['', Validators.required ],
      // "owner[password_confirmation]":['', Validators.required ]
   
      
     });
// this.owner= new FormGroup({
//   first_name: new FormControl('')
// });
     this.api.getCountries().subscribe((data) => {
      this.allCountries = data;
    });

    this.api.getServicesCategory().subscribe((data) =>{
      this.serviceCategories = data;
    });

    this.api.getProducts().subscribe((data) =>{
      this.allProductsCategories = data;
    });

  }

  register(){

    if(this.signUp.valid){
      console.log(this.signUp.value);
      this.api.registerOrg(this.signUp.value)
     .subscribe({
      next:(res)=>{
        alert(res.message.message)
      },
error:(err)=>{
  alert(err.error)
}

    })
      

    }else {
      console.log("The form is incomplete");
      this.validateAllFormFields(this.signUp)
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

  // public validate(): void {
  //   if (this.signUp.get('name')) {
  //     for (const control of Object.keys(this.reactiveForm.controls)) {
  //       this.reactiveForm.controls[control].markAsTouched();
  //     }
  //     return;
  //   }

  step1() {

    this.txtValue = '';
    if(this.txtValue == '')
    {
      this.message="Textbox is empty !!!";
      this.buttonDisabled = true;
    }
      
  }


  
}
