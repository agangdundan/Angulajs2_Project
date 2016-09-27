
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class LoginService {
   // Observable navItem source
  private _showNav = new BehaviorSubject<any>("");
  private _logindata = new BehaviorSubject<any>("");
  // Observable navItem stream
  showNav$ = this._showNav.asObservable();
  loginData$ = this._logindata.asObservable();
  // service command
  loginShow(someObj) {
    this._showNav.next(someObj);
  }

  setLoginData(string){
    this._logindata.next(string);
  }

}
