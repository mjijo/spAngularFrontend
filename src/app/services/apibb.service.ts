import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, throwError, switchMap, pipe } from 'rxjs';
import { JwtInterceptor } from '../helpers';

import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { Sp } from '../interfaces/sp';
import { JsonPipe } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseApiPath = 'http://159.203.108.137/api';
  private token: any = null;

  constructor(private httpClient: HttpClient)
  {
    //
  }

loginInd(username: string, password: string): Observable<any> {
    return this.httpClient.post(
      `${this.baseApiPath}/auth/login`,
      httpOptions
    );
  }
registerOrg(registerObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/initial-setup`,registerObj);
}
registerUser(registerUserObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/register`,registerUserObj);
}

updateUser(data :any,id: number) {
  let testkon:any = this.gettoken()
  console.log(testkon);
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  //let header:HttpHeaders = {'Authorization':'Bearer 3|9H5CLFxI8mEljdvGDBdp3kWMwvlORtAHRn2MGlS7'}
  return this.httpClient.patch(`${this.baseApiPath}/users/`+id,data,{headers: header} )
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))
}

loginUser(loginObj:any) {
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/login`,loginObj);
 
}

gettoken(){
  return this.httpClient.get<any>(`${this.baseApiPath}/sanctum/csrf-cookie`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
}

getserviceproviders(id: any){
  return this.httpClient.get<any>(`${this.baseApiPath}/services` + id)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
}


getserviceprovidersDetails(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/services/`+id)
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))
}

getProductDetails(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/products/`+id)
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))
}

listServicesById(catId:any){
  console.log(catId);
  return this.httpClient.get(`${this.baseApiPath}/services/?service_category_id=`+catId)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}
getServiceDetails(productSlug: Observable<string>): Observable<any> {
  return productSlug.pipe(
    switchMap((slug) => {
      return this.httpClient.get(`https://dis.opirth.com/api/services/${slug}`)
    })
  )
}
listProductsById(catId:any){

  return this.httpClient.get(`${this.baseApiPath}/products/?product_category_id=`+catId)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

forgotPassword(forgotpassObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/forget-password`,forgotpassObj);
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
