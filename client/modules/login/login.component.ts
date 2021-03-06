import { Component, Inject, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MenuService } from "../../service/menu.service";
import { ApiService } from "../../service/api.service";
import { LoginService } from "../../service/login.service";

@Component({
    selector: "home",
    templateUrl: `client/modules/login/login.component.html`
})
export class LoginComponent {
    error: string;
    response: {};
    password: any;
    username: any;
    private storage: any;

    constructor(private apiService: ApiService, private menuservice: MenuService, private lgs: LoginService) {
      this.storage = localStorage;
    }

    ngOnInit() {
        this.apiService
            .get("/login/login")
            .subscribe(
                (res) => {
                    // console.log("res login = ", res);
                },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
        this.lgs.loginShow('{"isShow": {"hiddenLogin":true,"loginPading":"0px"}}');
    }

    login(){
        let param = {
            user: this.username,
            password: this.password
        }
        // console.log(param);
        this.apiService
            .post("/login/login", param)
            .subscribe(
                (res) => {
                    // console.log(" res = ", res);
                    if(res.status === true){
                      let loginData = JSON.stringify(res.data[0]);
                      this.storage.setItem('logindata',loginData);
                      window.location.href = "#/home";
                      this.lgs.loginShow('{"isShow": {"hiddenLogin":false,"loginPading":"225px"}}');
                      // window.location.reload();
                    } else {
                        console.log("can't login");
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
