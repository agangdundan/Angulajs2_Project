import { Component } from "@angular/core";
import { MenuService } from "../../../service/menu.service";
import { pmslnService } from "../../../service/pmsln.service";

@Component({
    selector: "contact",
    templateUrl: `client/modules/contact/home/home.component.html`
})
export class ContactComponent {
    item = 1;
    constructor(private _navService: MenuService, private permission: pmslnService) {
        this.permission.isLogin();
        console.log("home.component contact");
    }

    ngOnInit(){

    }

    thisClick(item: string = '{"employees" :[{"a":"Jesse","b":"Jessica"},{"a":"Me","b":"MeMe"}]}'){
      console.log("click");
      this._navService.changeNav(item);
    }
}
