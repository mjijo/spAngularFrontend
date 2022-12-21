import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map, Observable } from 'rxjs';
import { Sp } from 'src/app/interfaces/sp';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-provider-details',
  templateUrl: './provider-details.component.html',
  styleUrls: ['./provider-details.component.scss']
})
export class ProviderDetailsComponent implements OnInit {

  referralsForm !:FormGroup;
  quotationForm !:FormGroup;
  id:any;
  spdetails:any;
  error:any;
  branches:any;
  testimonials: any;

  isLoggedin : boolean = false;
  
  constructor(private api : ApiService, private router: Router, private actRoute: ActivatedRoute, private fb: FormBuilder, private auth:AuthenticationService) { }

  ngOnInit(): void {
 
    this.actRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getServiceProviderById(this.id);
    this.getServiceProviderBranchesBy(this.id);
    this.getServiceProviderTestimonialsById(this.id);

    this.isLoggedin = this.auth.checkUser();
    this.referralsForm = this.fb.group({
      name:["", [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z].*')
      ]],
      service_id:[this.id],
      description: ["", [
        Validators.required, 
        Validators.minLength(3)]],
      email:["", [
        Validators.required, 
        Validators.email]],
      phone:["", [
        Validators.required,
        Validators.pattern('[0-9]*'), 
        Validators.minLength(10), 
        Validators.maxLength(10)]],

    });
    
    this.quotationForm = this.fb.group({
      name:["", [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z].*')
      ]],
      subject:["", [
        Validators.required, 
        Validators.minLength(3),
        
      ]],
      service_id:[this.id],
      description: ["", [
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

    });
  }
    getServiceProviderById(id:any){
    this.api.getserviceprovidersDetails(id).subscribe((data)=>{
      this.spdetails =data;
      console.log(this.spdetails)

    });
  }
    
 getServiceProviderBranchesBy(id:any){
    this.api.getserviceprovidersBranches(id).subscribe((data)=>{
      this.branches = data;
      console.log(this.branches);
    })
 }

 getServiceProviderTestimonialsById(id:any){
  this.api.getserviceprovidersTestimonials(id).subscribe((data)=>{
    this.testimonials = data;
    console.log(this.testimonials);
  })
}

   postReferral(){
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
          console.log(this.referralsForm.value);
        }
      })

    }else{
      console.log('The form is incomplete')
      this.validateAllFormFields(this.referralsForm)
    }
     
   }

   reQuotations(){
    if(this.quotationForm.valid){
      this.api.postQuotations(this.quotationForm.value).subscribe({
        next:(res)=>{
          Swal.fire({
            icon: 'success',
            title: 'DONE',
            text: 'You have requested Quotation successful!',
            
          })
          
          this.quotationForm.reset();
        },
        error:(err)=>{
          this.error =(err.error.message);
          console.log(this.quotationForm.value);
        }
      })

    }else{
      console.log('The form is incomplete')
      this.validateAllFormFields(this.quotationForm)
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
 
    
      
  
  

  
