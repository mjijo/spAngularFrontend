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
  private baseApiPath = 'http://109.123.241.92/api';
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

getserviceprovidersBranches(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/service-branches?includes[]=service&service_id=`+id)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
}

getserviceprovidersTestimonials(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/testimonials?includes[]=service/?service_id=`+id)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
}

postReferrals(referralsObj:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.post<any>(`${this.baseApiPath}/referrals/`,referralsObj,{headers: header});
 
}

postQuotations(referralsObj:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.post<any>(`${this.baseApiPath}/notifications?type=quotation-request`,referralsObj,{headers: header});
 
}

placeAbid(bidsObj:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.post<any>(`${this.baseApiPath}/bids`,bidsObj,{headers: header});
 
}

getProductDetails(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/products/`+id)
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))
}

getProductByOrgId(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/products?includes[]=organization=`+id)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
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

featuredMotorSalvage(catId:any){

  return this.httpClient.get<any>(`${this.baseApiPath}/products?featured=`+catId)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getFeaturedServiceproviders(){
  return this.httpClient.get<any>(`${this.baseApiPath}/services?featured=1`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))
}

tenders(){
  return this.httpClient.get<any>(`${this.baseApiPath}/tenders`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getTenderDetails(id:any) {
  return this.httpClient.get<any>(`${this.baseApiPath}/tenders/`+id)
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))
}

packages(){
  return this.httpClient.get<any>(`${this.baseApiPath}/packages`)
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

forgotPassword(forgotpassObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/auth/forget-password`,forgotpassObj);
}

subscriber(subscricerObj:any){
  return this.httpClient.post<any>(`${this.baseApiPath}/subscribe`,subscricerObj)
  // .pipe(map ((res:any)=>{
  //   return res.data;
  // }))

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


getBidsbyUserId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/bids?mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getAppointmentsbyId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/appointments?mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getRefferalsbyUserId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/referrals?mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getQuotationbyUserId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/notifications?type=quotation-request&mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getNotificationsbyUserId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/notifications?mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}

getOrdersbyUserId(id:any) {
  let localtoken:any = localStorage.getItem("user");
  localtoken = (localtoken ? JSON.parse(localtoken) : {});
  this.token = localtoken.access_token;
  let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
  console.log(this.token)
  return this.httpClient.get<any>(`${this.baseApiPath}/orders?mine=`+id,{headers: header})
  .pipe(map ((res:any)=>{
    return res.data;
  }))

}


  
}
