import { Component, Input, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ApiService } from "../../../service/api.service";
import { pmslnService } from "../../../service/pmsln.service";
import { LoginService } from "../../../service/login.service";
declare var $ : any;

@Component({
    selector: "staffsetting",
    templateUrl: "client/modules/setting/staff_setting/staff_setting.component.html"
})

export class StaffSetting {
    private storage: any;
    private staffId: any;
    private password: string;
    private staffData: any;
    private staffName: string;
    private staffUserName: string;
    private error: any;

    constructor(
      private apiService:ApiService,
      private permission:pmslnService,
      private lgs:LoginService,
      private _elRef: ElementRef,
      public toastr: ToastsManager){

    }

    ngOnInit(){
        this.permission.isLogin();
        console.log("staff_setting.component");

        this.storage = localStorage;
        this.getStaffFromStorage();
    }

    getStaffFromStorage(){
        if(this.storage.getItem('logindata')){
            let logindata = JSON.parse(this.storage.getItem('logindata'));
            this.staffData = logindata;
            console.log("staff = ", this.staffData);

            this.staffName = this.staffData.display_name;
            this.staffUserName = this.staffData.login_name;
            this.staffId = this.staffData._id;
            this.password = this.staffData.password
        }
    }

    updateStaff(){
        let param = {
          name: this.staffName,
          user: this.staffData.login_name,
          id: this.staffId,
          password: this.password
        }
        this.apiService
            .post("/login/updatestaff", param)
            .subscribe(
                (res) => {
                    if(res.status === true){
                      let loginData = JSON.stringify(res.data[0]);
                      this.storage.setItem('logindata',loginData);
                      this.lgs.loginShow('{"isShow": {"hiddenLogin":false,"loginPading":"225px"}}');
                      // alert("Change data complete!");
                      this.toastr.success('Change data complete!', 'Success!');
                    } else {
                        console.log("can't change");
                    }
                },
                (error) => {
                    this.error = error.message;
                    console.log("error = ", this.error);
                    setTimeout(() => this.error = null, 4000);
                }
            )
    }
}
