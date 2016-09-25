import { Component, Input, ElementRef } from "@angular/core";
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from "../../../service/api.service";
import { MenuService } from "../../../service/menu.service";
import { pmslnService } from "../../../service/pmsln.service";
declare var $ : any;

@Component({
    selector: "catagory_edit",
    templateUrl: "client/modules/category/category_manage/category_manage.html"
})
export class CategoryManageComponent {
    private error:string = "";
    private cateId:any;
    private cateName:string = "";
    private cateDescription:string = "";
    private selectedStatus:any = "Y";

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

    changeStatus(newValue) {
        console.log(newValue);
        this.selectedStatus = newValue;
    }

    saveCategory(){
        let param = {
            cate_id: this.cateId,
            cate_name: this.cateName,
            cate_description: this.cateDescription,
            cate_status: this.selectedStatus
        };

        this.apiService
            .post("/category/savecategory", param)
            .subscribe(
                (res) => {
                    console.log(" res = ", res);
                    if(res.status === true){
                        alert("บันทึกข้อมูลสำเร็จ");
                        this.reset();
                    } else {
                        console.log("can't save");
                    }
                },
                (error) => {
                    this.error = error.message;
                    console.log("error = ", this.error);
                    setTimeout(() => this.error = null, 4000);
                }
            )
    }

    reset(){
        this.cateId = "create";
        this.cateName = "";
        this.cateDescription = "";
        this.selectedStatus = "Y";
    }
}
