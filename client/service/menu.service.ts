
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class MenuService {
   // Observable navItem source
  private _navItemSource = new BehaviorSubject<any>("");
  private _logindata = new BehaviorSubject<any>("");
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  loginData$ = this._logindata.asObservable();
  // service command
  changeNav(number) {
    this._navItemSource.next(number);
  }

  setLoginData(string){
    this._logindata.next(string);
  }

}
