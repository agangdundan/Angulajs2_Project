import { Component, Input, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService } from "../../../service/api.service";
import { MenuService } from "../../../service/menu.service";
import { pmslnService } from "../../../service/pmsln.service";
import { FilterTable } from "../../../service/table.filter.service";
declare var $ : any;

@Component({
    selector: "catagory",
    templateUrl: "client/modules/category/category_list/category_list.html",
})
export class CategoryListComponent {
    private item = 1;
    private error:string = "";
    private query:string = "";
    private categoryList = [];
    private categorys = [];
    private cols = ["cate_name","cate_description","product_qty","status"];

    private filterTable:any;

    constructor( private router: Router,
        private apiService: ApiService ,
        private _navService: MenuService,
        private permission: pmslnService,
        private _elRef: ElementRef) {
            this.filterTable = new FilterTable();
            this.permission.isLogin();
            console.log("category_list.component");
    }

    ngOnInit(){
      // console.log("do Init");
      this.getCategoryList();
    }

    getCategoryList(){
      let param = {"id":"ทดสอบ"}
      this.apiService
          .post("category/category_list",param)
          .subscribe(
              (data) => {
                //   console.log("from category = ",data);
                  this.categoryList = data.data;
                  this.categorys = this.filterTable.filter(this.cols,this.categoryList,this.query,1,10);
              },
              (error: Error) => {
                  this.error = error.message;
                  console.log("errer = ", this.error);
                  setTimeout(() => this.error = null, 4000)
              });
    }

    add_new_category(id){
      console.log("add new cate = ", this.query);
        let link = ['/category_list/create_cate', id];
        this.router.navigate(link);
    }

    filterCategory(){
          this.categorys = [];
          this.categorys = this.filterTable.filter(this.cols,this.categoryList,this.query,1,10);
    }

    clickme(md){
        console.log(md);
        $(this._elRef.nativeElement).find('#me').removeClass("a");
        $(this._elRef.nativeElement).find('#me').addClass("intro");
    }
}
