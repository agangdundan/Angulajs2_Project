import { Component, Input, ElementRef } from "@angular/core";
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../../../service/api.service";
import { MenuService } from "../../../service/menu.service";
import { pmslnService } from "../../../service/pmsln.service";
declare var $ : any;

@Component({
    selector: "catagory_edit",
    // templateUrl: "client/modules/category/category_list/category_list.html",
    template : `<div> Hello </div>` 
})
export class CategoryManageComponent {
    item = 1;
    error:string = "";
    query:string = "";
    categoryList = [];
    categorys = [];
    private cateId:any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private apiService: ApiService , 
        private permission: pmslnService,
        private _navService: MenuService,
        private _elRef: ElementRef) {
            this.permission.isLogin();
            console.log("category_list.component");
    }

    ngOnInit(){
      console.log(this.route.params);
      this.cateId = this.route.snapshot.params['id'];
      console.log(this.cateId);
    }

    getCategoryList(){
      
    }

    clickme(md){
        
    }
}
