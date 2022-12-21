import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map, Observable } from 'rxjs';
import { Sp } from 'src/app/interfaces/sp';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent implements OnInit {

  referralsForm !:FormGroup;
  id:any;
  spdetails:any;
  error:any;
  
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
 
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getServiceProviderById(this.id);

    this.referralsForm = this.fb.group({
      name:["", [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z].*')
      ]],
      description: ["", [
        Validators.required, 
        Validators.minLength(3)]],
      email:["", [
        Validators.required, 
        Validators.email]],

    });
  }
    getServiceProviderById(id:any){
    this.api.getserviceprovidersDetails(id).subscribe((data)=>{
      this.spdetails =data;
      console.log(this.spdetails)

    });
  }
    
   postReffal(){
    if(this.referralsForm.valid){
      this.api.postReferrals(this.referralsForm.value).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'DONE',
            text: 'Your referral is successful!',
            
          })
          this.referralsForm.reset();
        },
        error:(err)=>{
          this.error =(err.error.message);
        }
      })

    }else{
      console.log('The form is incomplete')
      this.validateAllFormFields(this.referralsForm)
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
 
    
      
  
  

  
