import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

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

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signUp = this.fb.group({
      name: ['', Validators.required ],
      country_id:['', Validators.required ],
      industry_ids:['', Validators.required ],
      // contact_email:['', Validators.required ],
      // contact_phone:['', Validators.required ],
      town:['', Validators.required ],
      zip_code:['', Validators.required ],
      // postal_code:['', Validators.required ],
      postal_address:['', Validators.required ],
      physiscal_address:['', Validators.required ],
      registration_number:['', Validators.required ],
      registration_certificate:['', Validators.required ],
      // logo:['', Validators.required ],
      tax_pin_number:['', Validators.required ],
      tax_certificate:['', Validators.required ],
      owner_first_name:['', Validators.required ],
      // owner_middle_name:['', Validators.required ],
      // owner_last_name:['', Validators.required ],
      owner_email:['', Validators.required ],
      owner_phone:['', Validators.required ],
      owner_password:['', Validators.required ],
      owner_password_confirmation:['', Validators.required ],
     });

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
    }

  }

}
