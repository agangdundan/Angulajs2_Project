import { Component } from "@angular/core";
import { MenuService } from "../../../service/menu.service";

@Component({
    selector: "contact",
    templateUrl: `client/modules/contact/home/home.component.html`
})
export class ContactComponent {
    item = 1;
    constructor(private _navService:MenuService) {}

    thisClick(item: string = '{"employees" :[{"a":"Jesse","b":"Jessica"},{"a":"Me","b":"MeMe"}]}'){
      console.log("click");
      this._navService.changeNav(item);
    }
}
