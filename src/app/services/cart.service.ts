import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  private token: any = null;

  public cartTotal : number = 0;
  constructor(
    private http: HttpClient
  ) { }

  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
   
  getCartItems(){
    let localtoken:any = localStorage.getItem("user");
    localtoken = (localtoken ? JSON.parse(localtoken) : {});
    this.token = localtoken.access_token;
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.http.get(`${environment.apiUrl}/shopping-cart?includes[]=user&includes[]=items`,{headers: header})
    
  }

    getCartTotalItems(): Observable<any>{
    
      
    return this.getCartItems();
       
        
   }

  addProductToCart(product : any){
  
    let localtoken:any = localStorage.getItem("user");
    localtoken = (localtoken ? JSON.parse(localtoken) : {});
    this.token = localtoken.access_token;
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.http.post<any>(`${environment.apiUrl}/shopping-cart-items`,product,{headers: header})
    // .pipe(
    //   map(product => {
    //     console.log(product);
    //   })
    // );
  }

  addtoCart(product : any){
    
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
    
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }


  
  removeCartItem(id: number){
    let localtoken:any = localStorage.getItem("user");
    localtoken = (localtoken ? JSON.parse(localtoken) : {});
    this.token = localtoken.access_token;
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    return this.http.delete(`${environment.apiUrl}/shopping-cart-items/`+id,{headers: header})
    .pipe(map ((res:any)=>{
      return res;
    }))
    // this.cartItemList.map((a:any, index:any)=>{
    //   if(product.id=== a.id){
    //     this.cartItemList.splice(index,1);
    //   }
    // })
    // this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }


  postCartDataToOrder(product : any) {
    let localtoken:any = localStorage.getItem("user");
    localtoken = (localtoken ? JSON.parse(localtoken) : {});
    this.token = localtoken.access_token;
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    
    return this.http.post<any>(`${environment.apiUrl}/orders`,product,{headers: header})
    
    .pipe(map ((res:any)=>{
      return res;
      // localStorage.setItem('res', JSON.stringify(res));

    }))
  
  }

getShipmentDetails(id: number){
    let localtoken:any = localStorage.getItem("user");
    localtoken = (localtoken ? JSON.parse(localtoken) : {});
    this.token = localtoken.access_token;
    let header = new HttpHeaders().set("Authorization", 'Bearer ' + this.token);
    
    return this.http.patch(`${environment.apiUrl}/orders/`+id,{headers: header}) 
    
  }
}
