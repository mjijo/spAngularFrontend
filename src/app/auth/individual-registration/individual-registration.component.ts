import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup ,Validators,FormControl} from '@angular/forms';

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

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.signUpIndividual = this.fb.group({
      first_name: ['', Validators.required ],
      // middle_name: ['', Validators.required ],
      last_name:['', Validators.required ],
      email:['', Validators.required ],
      phone:['', Validators.required ],
      password:['', Validators.required ],
      password_confirmation:['', Validators.required ],
      country_id:['' ],
      town:['' ],
      zip_code:[''],
      gender:[''],
      date_of_birth:['' ],
      occupation:[''],
      postal_address:['' ],
      physical_address:[''],
      identification_document:['' ],
      identification_number:[''],
      passport:['' ],
      identification_file:[''],
     
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

    if(this.signUpIndividual.valid){
      console.log(this.signUpIndividual.value);
      this.api.registerUser(this.signUpIndividual.value)
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

