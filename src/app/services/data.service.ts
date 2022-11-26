import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dateNow: Date = new Date();
  public dateToday;
  
  public user: any = null;
  public user_profile: any = null;
  public userId: any = null;

  private isSuperAdmin: boolean = false;
  private isAdmin: boolean = false;
  private isStaff: boolean = false;
  public mode: any = {
    sa_mode: false, // super admin mode
    ua_admin: false, // user admin mode (administrative normal user)
    nu_mode: false // normal user mode
  }


  constructor(private router: Router,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              private apiService: ApiService)
  {
    this.dateToday = this.datePipe.transform(this.dateNow, 'yyyy-MM-dd');
  }

  readableDate(date: string){
    if(date){
      let datesTimeArr = date.split(' ');
    
      let datesArr = datesTimeArr[0].split('-');
      let year = datesArr[0];
      let month = parseInt(datesArr[1]);
      let day = parseInt(datesArr[2]);
      let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      let theDay = (day > 3 ? day+'th' : (day == 1 ? day+'st' : (day == 2 ? day+'nd' : day+'rd')));
      let theDate = theDay + ' ' + months[month - 1];
      let fullDate = theDate + ', ' + year;

      if(datesTimeArr.length > 1){
          let timeArr = datesTimeArr[1].split(':');
          let hour = parseInt(timeArr[0]);
          let postfix = (hour > 12 ? 'PM' : 'AM');
          hour = (hour > 12 ? hour-12 : hour);
          let minutes = timeArr[1];
          fullDate = fullDate + ' at ' + hour + ':' + minutes + postfix;
      }
      return fullDate;
    }else{
      return date
    }
  }

  readableTime(time: string){
    if(time){
      let timeArr = time.split(':');
      let hour = parseInt(timeArr[0]);
      let postfix = (hour > 12 ? 'PM' : 'AM');
      hour = (hour > 12 ? hour-12 : hour);
      let minutes = timeArr[1];
      let fullTime = hour + ':' + minutes + postfix;
      return fullTime;
    }else{
      return time
    }
  }

  formateDateTimeForInput(datetime:string){
    let arr = datetime.split(' ');
    let theDate = arr[0];
    let theTime = arr[1];
    return theDate + 'T' + theTime; // this is the 'datetime-local' input type format
  }

  authUsr(){
    let usrCheck = localStorage.getItem(this.apiService.getEndpoints().local_storage.user);
    console.log('user check >',usrCheck);

    if(usrCheck){
      let payload = this.rot47(usrCheck);
      let usrObj = JSON.parse(payload.toString());
      console.log('User Obj > ',usrObj);

      this.user_profile = ('profile' in usrObj ? usrObj.profile : null);
      if( this.user_profile ){
        if(this.user_profile.user_group_id == 1 || this.user_profile.user_group_id == "1"){
          this.mode = {
            sa_mode: true, // super admin mode
            ua_admin: false, // user admin mode (administrative normal user)
            nu_mode: false // normal user mode
          }
        }else if(this.user_profile.user_group_id == 4 || this.user_profile.user_group_id == "4"){
          this.mode = {
            sa_mode: false, // super admin mode
            ua_admin: true, // user admin mode (administrative normal user)
            nu_mode: false // normal user mode
          }
        }else{
          this.mode = {
            sa_mode: false, // super admin mode
            ua_admin: false, // user admin mode (administrative normal user)
            nu_mode: true // normal user mode
          }
        }
      }
      this.user = ('user' in usrObj ? usrObj.user : null);
      
      if('user' in usrObj){
        this.router.navigate(["/dashboard"]);
        return true;
      }else{
        this.router.navigate(["/auth/login"]);
        return false;
      }
    }else{
      this.router.navigate(["/auth/login"]);
      return false;
    }
  }

  getUsr(){
    let usrCheck = localStorage.getItem(this.apiService.getEndpoints().local_storage.user);
    if(usrCheck){
      let payload = this.rot47(usrCheck);
      let usrObj = JSON.parse(payload.toString());

      this.user_profile = ('profile' in usrObj ? usrObj.profile : null);
      this.user = ('user' in usrObj ? usrObj.user : null);

      if('user' in usrObj){
        return usrObj;
      }else{ return null; }
    }else{ return null; }
  }

  signIn(payload:any): Observable<any>{
    // return coming soon movies
    let endpoint: any = this.apiService.getEndpoints();
    return this.apiService.post(payload, endpoint.sign_in);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(["/auth/login"]);
  }

  rot13(str:string) {
    let input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
    let encoded = '';
    for (let i=0; i < str.length; i++) {
        let index = input.indexOf(str[i]);
        encoded += output[index];
    }
    return encoded;
  }

  ROTn(text:string, map:string) {
    // Generic ROT-n algorithm for keycodes in MAP.
    var R = new String()
    var i, j, c, len = map.length
    for(i = 0; i < text.length; i++) {
      c = text.charAt(i)
      j = map.indexOf(c)
      if (j >= 0) {
        c = map.charAt((j + len / 2) % len)
      }
      R = R + c
    }
    return R;
  }

  rot47(text:string) {
    // Hides all ASCII-characters from 33 ("!") to 126 ("~").  Hence can be used
    // to obfuscate virtually any text, including URLs and emails.
    var R = new String()
    R = this.ROTn(text,"!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~")
    return R;
  }
}
