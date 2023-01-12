import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  subscribersForm!: FormGroup;
  error!: any;

  constructor(private api:ApiService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.subscribersForm = this.fb.group({

      email:["", [
        Validators.required, 
        Validators.email]],
      
    })
  }

subscribeBtn(){
  if(this.subscribersForm.valid){
    console.log(this.subscribersForm.value);
    
    
    this.api.subscriber(this.subscribersForm.value)
   .subscribe({
    next:(res)=>{
    
      Swal.fire({
        icon: 'success',
        title: 'DONE',
        text: 'Your subscription is successful!',
        
      })
      this.subscribersForm.reset();
    },
    error:(err)=>{
     
      console.log (err.error.errors.email);
      this.error = (err.error.errors.email);
        
      }
      // this.message = this.error.message;
   
    })
  }else {
    console.log("The form is incomplete");
    this.validateAllFormFields(this.subscribersForm)
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
