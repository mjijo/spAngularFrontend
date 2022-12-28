import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { PluginsService } from 'src/app/services/plugins.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loading = false;
  user?: User | any;
  private id_file : File | Blob | any;
  constructor(
    private userService: UserService,
    private api:AuthenticationService,
    private update: ApiService,
    private plugin : PluginsService
  ) { }

  ngOnInit(): void {
    this.api.user.subscribe(x => 
      this.user = x);
      console.log(this.user.user);
  }

  setIdFiles(event:Event|any){
    this.id_file = event.target.files[0];
    console.log(this.id_file);
  }

  logout(){
    this.api.logout()
  }

  updateUserProfile(user: any) {
    console.log('updating user')
    // let idForm = new FormData();
    // idForm.append('files[]', this.id_file);
    // idForm.append('first_name', user.user.first_name);
    // idForm.append('last_name', user.user.last_name);
    // idForm.append('email', user.user.email);
    // idForm.append('phone', user.user.phone);
    // idForm.append('zip_code', user.user.zip_code);
    // idForm.append('occupation', user.user.occupation);
    // idForm.append('postal_address', user.user.postal_address);
    // idForm.append('physical_address', user.user.physical_address);
    // idForm.append('country_id', user.user.country_id);

    console.log(this.id_file);
    // console.log(idForm);
    // user.user.identification_file = this.id_file;
    console.log(user);
    this.update.updateUser(user,user.id)
    .subscribe({
      next:(res:any)=>{
        let user:any = localStorage.getItem('user');
        user =(user ? JSON.parse(user): null);
        if(user){
          user.user.first_name = this.user.user.first_name;
          user.user.last_name = this.user.user.last_name;
          user.user.email = this.user.user.email;
          user.user.phone = this.user.user.phone;
          user.user.country_id = this.user.user.country_id;
          user.user.zip_code = this.user.user.zip_code;
          user.user.occupation = this.user.user.occupation;
          user.user.postal_address = this.user.user.postal_address;
          user.user.physical_address = this.user.user.physical_address;
        }
        console.log(user)
        localStorage.setItem('user', JSON.stringify(user));
        this.plugin.showAlert('success','DONE', 'Profile updated Successfully');
        
      },
error:(err)=>{
  // alert(JSON.stringify(err.error));
  console.log (JSON.stringify(err.error));
  if("errors" in err.error){
    if("password" in err.error.errors){
      // if(Array.isArray()){}
      // this.extraerror = err.error.errors.password[0]
    }
    
  }
  this.plugin.showAlert('error','An Error Occured', 'Check if all your fields');
  
  // this.error = (JSON.stringify(err.error.message));
  // this.message = this.error.message;
}
    });

  }
}
