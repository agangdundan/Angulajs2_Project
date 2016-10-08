import { Component, Input, ElementRef } from "@angular/core";
import { MenuService } from "../../service/menu.service";
import { LoginService } from "../../service/login.service";
import { Subscription } from 'rxjs/Subscription';
declare var $ : any;

@Component({
    selector: "menu",
    templateUrl: "./client/components/shared/template/menu.html"
})
export class MenuComponent {
    @Input() name: string;
    private storage: any;
    private test: any;
    private test1: any;
    private staffData:any;
    private display_name: any;
    private menuId: any[];
    private dropDownMenu: any;

    subscription:Subscription;

    constructor(private _navService:MenuService, private lgs:LoginService, private _elRef: ElementRef){
      this.storage = localStorage;
    }

    ngOnInit() {
      this.lgs.showNav$.subscribe(data => this.setUserData(data));
      this._navService.navItem$.subscribe(data => this.gensomething(data));
      
      if(this.storage.getItem('logindata')){
        let logindata = JSON.parse(this.storage.getItem('logindata'));
        this.staffData = logindata;
        this.display_name = logindata.display_name;
        // console.log("staff = ", this.staffData);
      }
      
      this.menuId = $(this._elRef.nativeElement).find('.menu');
    }

    gensomething(od){
        if(od != "" && od != undefined){
          console.log(od);
          this.test1 = od;
          console.log(JSON.parse(this.test1));
          this.test = JSON.parse(od).employees;
        }
    }

    setUserData(obj){
      // console.log("do ever");
      if(this.storage.getItem('logindata')){
        let logindata = JSON.parse(this.storage.getItem('logindata'));
        this.staffData = logindata;
        this.display_name = logindata.display_name;
        // console.log("staff = ", this.staffData);
      }
    }

    logOut(){
      // console.log("Do log out");
      window.location.href = "#/login";
      // location.reload();
    }

    menuClick(idName){
      for (let i=0; i < this.menuId.length; i++){
        $(this._elRef.nativeElement).find('#'+this.menuId[i].id).css({'background':'','color':''});
        if(this.menuId[i].id == idName){
          $(this._elRef.nativeElement).find('#'+this.menuId[i].id).css({'background':'#000','color':'#fff'});
        }
      }

      // for (let j=0; j < this.dropDownMenu.length; j++){
      //   $('#' + this.dropDownMenu[j].id).css({'background':'','color':''});
      //   if(this.dropDownMenu[j].id == idName){
      //     $('#'+this.dropDownMenu[j].id).css({'background':'#000','color':'#fff'});
      //   }
      // }
    }

}
