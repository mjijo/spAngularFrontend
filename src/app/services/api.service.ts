import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiPath = 'https://dis.opirth.com/api';

  constructor(private httpClient: HttpClient)
  {
    //
  }
// login(data: any, param: string): Observable<any> {
//   return this.httpClient.post(`${this.baseApiPath}/auth/login`,data);
// }
registerOrg(registerObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/initial-setup`,registerObj);
}
registerUser(registerUserObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/register`,registerUserObj);
}

loginUser(loginObj:any) {
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/login`,loginObj);
 
}

forgotPassword(forgotpassObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}//auth/forget-password`,forgotpassObj);
}

getCountries(){
  return this.httpClient.get<any>(`${this.baseApiPath}/countries`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getServicesCategory(){
  return this.httpClient.get<any>(`${this.baseApiPath}/service-categories`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}


getProducts(){
  return this.httpClient.get<any>(`${this.baseApiPath}/product-categories`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

  // get(param: any): Observable<any> {
  //   return this.httpClient.get(`${this.baseApiPath}/${param}`)
  // }

  // get2(param: any): Observable<any> {
  //   return this.httpClient.get(`${this.baseApiPath}/${param}`)
  // }

  // getWithOrigin(param: any): Observable<any> {
  //   let headers = new HttpHeaders({
  //     'browserRef': 'portal'
  //   });
  //   let requestOptions = { headers: headers };
    
  //   return this.httpClient.get(`${this.baseApiPath}/${param}`,requestOptions)
  // }

  // post(data: any, param: string): Observable<any> {
  //   return this.httpClient.post(`${this.baseApiPath}/${param}`, data)
  // }

  // getEndpoints(){
  //   return {
  //     sign_in: 'usrLogin',
  //     register_user: 'rgstUsr',
  //     settings: {
  //       countries: {
  //         get_all_countries: 'getAllCountries'
          
  //       },
  //       service_categories: {
  //         get_all_categories: 'getAllServiceCategories'
         
  //       },
  //       product_categories: {
  //         get_all_product_categories: 'getProdCats'
        
  //       },
  //       sectors: {
  //         get_all_sectors: 'getAllSectors'
         
  //       }
  //     },
  //     local_storage: {
  //       user: 'fesplocdat'
  //     }
  //   }
  // }
}
