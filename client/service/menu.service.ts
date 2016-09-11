
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class MenuService {
   // Observable navItem source
  private _navItemSource = new BehaviorSubject<any>("");
  // Observable navItem stream
  navItem$ = this._navItemSource.asObservable();
  // service command
  changeNav(number) {
    this._navItemSource.next(number);
  }

}
