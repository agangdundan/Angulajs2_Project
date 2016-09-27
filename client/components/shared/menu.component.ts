import { Component, Input } from "@angular/core";
import { MenuService } from "../../service/menu.service";
import { LoginService } from "../../service/login.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: "menu",
    templateUrl: "./client/components/shared/template/menu.html"
})
export class MenuComponent {
    @Input() name: string;
    private storage: any;
    test: any;
    test1: any;
    display_name: any;

    subscription:Subscription;

    constructor(private _navService:MenuService, private lgs:LoginService){
      this.storage = localStorage;
      this.lgs.showNav$.subscribe(data => this.setUserData(data));
      this._navService.navItem$.subscribe(data => this.gensomething(data));
    }

    ngOnInit() {
      //this.subscription = this._navService.navItem$.subscribe(test => this.test1 = test );
      if(this.storage.getItem('logindata')){
        let logindata = JSON.parse(this.storage.getItem('logindata'));
        this.display_name = logindata.display_name;
      }
    }

    gensomething(od){
        if(od != "" && od != undefined){
          console.log(od);
          this.test1 = od;
          console.log(JSON.parse(this.test1));
          this.test = JSON.parse(od).employees;
        }
        // else{
        //     console.log(od);
        //     this.test1 = od;
        //     console.log(JSON.parse(this.test1));
        //     this.test = JSON.parse(od).employees;
        // }
    }

    setUserData(obj){
      // console.log("do ever");
      if(this.storage.getItem('logindata')){
        let logindata = JSON.parse(this.storage.getItem('logindata'));
        this.display_name = logindata.display_name;
      }
    }

    logOut(){
      // console.log("Do log out");
      window.location.href = "#/login";
      // location.reload();
    }

}
