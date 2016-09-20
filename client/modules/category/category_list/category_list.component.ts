import { Component, Input } from "@angular/core";
import { ApiService } from "../../../service/api.service";
import { MenuService } from "../../../service/menu.service";
import { pmslnService } from "../../../service/pmsln.service";

@Component({
    selector: "contact",
    templateUrl: "client/modules/category/category_list/category_list.html"
})
export class CategoryListComponent {
    item = 1;
    error:string = "";
    categoryList = [];
    constructor(private apiService: ApiService ,private _navService: MenuService, private permission: pmslnService) {
        this.permission.isLogin();
        console.log("category_list.component");
    }

    ngOnInit(){
      this.getCategoryList();
    }

    getCategoryList(){
      let param = {"id":"ทดสอบ"}
      this.apiService
          .post("category/category_list",param)
          .subscribe(
              (data) => {
                  console.log("from category = ",data);
                  this.categoryList = data.data;
              },
              (error: Error) => {
                  this.error = error.message;
                  console.log("errer = ", this.error);
                  setTimeout(() => this.error = null, 4000)
              });
    }

    add_new_category(){
      console.log("add new cate");
    }
}
