import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public allsectors:any = [];
  public allcountries:any = [];
  public isLoading: boolean = false;
  public this_register: any = {
    
    full_name: null,
    country_id: null,
    town: null,
    zip: null,
    sector_id: null,
    postal_address: null,
    physical_address: null,
    reg_number: null,
    reg_certificate: null,
    tax_number: null,
    tax_certificate: null,
    email: null,
    username: null,
    phone: null,
    user_pwd: null,
    verification_code: null,
    is_business: 'true'
   
   
  }

public isUpdate: boolean = false;

  constructor(private apiService: ApiService)

              {

              }

  async ngOnInit() {
    await this.getcountries();
    await this.getsectors();
  }

  validateInputs(){
    // do not proceed if true
    let status = true;
   
      let full_name_err = true;
      let country_err = true;
      let town_city_err = true;
      let zip_code_err = true;
      let industry_name_err = true;
      let postal_address_err = true;
      let physical_address_err = true;
      let registration_no_err = true;
      let registration_certificate_err = true;
      let tax_no_err = true;
      let tax_certificate_err = true;
      let email_err = true;
      let username_err = true;
      let phone_err = true;
      let password_err = true;
      let confirm_password_err = true;

      if(this.this_register.full_name != null && this.this_register.full_name != '' && this.this_register.full_name != ' '){ full_name_err = false; };
      if(this.this_register.country_id != null && this.this_register.country_id != null && this.this_register.country_id != '' && this.this_register.country_id != ' '){ country_err = false; };
      if(this.this_register.town != null && this.this_register.town != '' && this.this_register.town!= ' '){ town_city_err = false; };
      if(this.this_register.zip != null && this.this_register.zip != '' && this.this_register.zip!= ' '){ zip_code_err = false; };
      if(this.this_register.sector_id != null && this.this_register.sector_id != '' && this.this_register.sector_id!= ' '){ industry_name_err = false; };
      if(this.this_register.postal_address != null && this.this_register.postal_address != '' && this.this_register.postal_address!= ' '){ postal_address_err = false; };
      if(this.this_register.physical_address != null && this.this_register.physical_address != '' && this.this_register.physical_address!= ' '){ physical_address_err = false; };
      if(this.this_register.reg_number != null && this.this_register.reg_number != '' && this.this_register.reg_number!= ' '){ registration_no_err = false; };
      if(this.this_register.reg_certificate != null && this.this_register.reg_certificate != '' && this.this_register.reg_certificate!= ' '){ registration_certificate_err = false; };
      if(this.this_register.tax_no != null && this.this_register.tax_no != '' && this.this_register.tax_no!= ' '){ tax_no_err = false; };
      if(this.this_register.tax_certificate != null && this.this_register.tax_certificate != '' && this.this_register.tax_certificate!= ' '){ tax_certificate_err = false; };
      if(this.this_register.email != null && this.this_register.email!= '' && this.this_register.email!= ' '){ email_err = false; };
      if(this.this_register.username != null && this.this_register.username!= '' && this.this_register.username!= ' '){ username_err = false; };
      if(this.this_register.phone != null && this.this_register.phone!= '' && this.this_register.phone!= ' '){ phone_err = false; };
      if(this.this_register.user_pwd != null && this.this_register.user_pwd!= '' && this.this_register.user_pwd!= ' '){ password_err = false; };
      if(this.this_register.confirm_password != null && this.this_register.confirm_password!= '' && this.this_register.confirm_password!= ' '){ confirm_password_err = false; };

      // also check that the country code or phone code is not a duplicate of an existing one
      // this.allIndustrySectors.forEach((sector:any) => {
      //   if(sector.sector_name == this.this_register.sector_name){ full_name_err = true; }
      //   if(this.this_register.industry_sector_id == null && sector.sector_slug == this.this_register.sector_slug){ sector_slug_err = true; }
      // });

      status = (full_name_err || country_err || town_city_err || zip_code_err  || industry_name_err || postal_address_err || physical_address_err || registration_no_err || registration_certificate_err || tax_no_err || tax_certificate_err || username_err || phone_err || username_err || password_err || confirm_password_err ? true : false);
      return status;
    
  }


  async getcountries() {
    let endpoint: string = this.apiService.getEndpoints().settings.countries.get_all_countries;
    await this.apiService.get(endpoint).subscribe(
      (response:any) => {
        if(response){
          if ('data' in response) {
            this.allcountries = response.data;
            console.log('All Countries >',this.allcountries);
            
          }
        }
      },
      error => { 
        console.log('Countries Err Response >', error);
        
      }
    );

  }

  async getsectors() {
    let endpoint: string = this.apiService.getEndpoints().settings.sectors.get_all_sectors;
    await this.apiService.get(endpoint).subscribe(
      (response:any) => {
        if(response){
          if ('data' in response) {
            this.allsectors = response.data;
            console.log('all sectors >',this.allsectors);
            
          }
        }
      },
      error => { 
        console.log('Sectors Err Response >', error);
        
      }
    );
  } 

  async register() {
    console.log("Payload = ",this.this_register)
    let endpoint: string = this.apiService.getEndpoints().register_user;
    await this.apiService.post(this.this_register,endpoint).subscribe(
      (response:any) => {
        if(response){
          if ('data' in response) {
            
            console.log('Success registration Response >',response);
            
          } else {
            console.log('Failed Registration Response >', response)
          }
        }
      },
      error => { 
        console.log('Reg Err Response >', error);
        
      }
    );
  }

}
