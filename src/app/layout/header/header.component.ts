import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  signIn!: FormGroup;
 username: any;
 public totalItem : number = 0;

 isLoggedIn : boolean =false;



  constructor(private formbuilder: FormBuilder , private api: ApiService, private router:Router, private auth:AuthenticationService, public cartService: CartService) { }

  async ngOnInit() {
    this.cartService.getProducts()
    .subscribe(res=>{
      // this.totalItem = res.length;
    })
   this.isLoggedIn = this.auth.checkUser();
   console.log('Islogged in?', this.isLoggedIn);
   await this.loadItemCount();
  }
  
  
  async loadItemCount ()
      {
        await this.cartService.getCartTotalItems().subscribe((res :any) => {
          if(res){
            let totalItem = 0;
          console.log(res);
          if('data' in res){
            
            res.data.forEach((item:any) => {
              totalItem += item.quantity;
            });
            console.log(totalItem);
            
          }
          this.totalItem = totalItem;
          this.cartService.cartTotal = this.totalItem;

          }
            
        });
     let totalItem = await this.cartService.getCartTotalItems();
        console.log(totalItem);
        // await this.cartService.getCartItems()
        // .subscribe((res:any)=>{
          
        //   console.log(res);
        //   if('data' in res){
        //     res.data.forEach((item:any) => {
        //       this.totalItem += item.quantity;
        //     });
        //     console.log(this.totalItem);
        //   }
        // })
      }

  headerlogout()
  {
    this.auth.logout();
    this.isLoggedIn = false;
    window.location.reload();
  }
  
  }

  
