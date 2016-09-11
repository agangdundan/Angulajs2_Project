import { Component, Input } from "@angular/core";
import { MenuService } from "../../service/api.menuService";
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: "hello",
    templateUrl: "./client/components/shared/template/menu.html"
})
export class MenuComponent {
    @Input() name: string;
    test: any;
    test1: any;

    subscription:Subscription;

    constructor(private _navService:MenuService){}

    ngOnInit() {
    //this.subscription = this._navService.navItem$.subscribe(test => this.test1 = test );
    this._navService.navItem$.subscribe(data => this.gensomething(data));
    }

    gensomething(od){
        if(od == "" || od == undefined){
            console.log("x");
        }else{
            console.log(od);
            this.test1 = od;
            console.log(JSON.parse(this.test1));
            this.test = JSON.parse(od).employees;
        }
    }
}
