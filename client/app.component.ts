import { Component, ViewChild } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { LoginService } from "./service/login.service";
// import { SemanticPopupComponent } from "ng-semantic";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "./client/app.component.html"
})
export class AppComponent {

    hiddenLogin: any = true;
    loginPading: any = "225px";
    appName: string = "Angular 2 Express";
    user: any = {
        password: "angualr2express",
        username: "john"
    };
    response: Response;
    isLogged: boolean;
    // @ViewChild("myPopup") myPopup: SemanticPopupComponent;

    constructor(private http: Http, private lgs: LoginService) {
        this.isLogged = !!localStorage.getItem("id_token");
        this.lgs.showNav$.subscribe(data => this.showNav(data));
    }

    logout(): void {
        localStorage.removeItem("id_token");
        location.reload();
    }

    ngOnInit(){
      // console.log("check login");
      let user: any = "";
      this.http.get("/login/checkLogin")
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    //localStorage.setItem("id_token", res.jwt);
                    // console.log("res = ", res);
                    if(res.status){
                        this.hiddenLogin = false;
                        this.loginPading = "225px";
                    }else{
                        this.hiddenLogin = true;
                        this.loginPading = "0px";
                        window.location.href = "#/login";
                    }
                },
                (error: Error) => { console.log(error); }
            );
    }

    showNav(obj){
      if(obj != "" && obj != undefined){
        let show = JSON.parse(obj);
        this.hiddenLogin = show.isShow.hiddenLogin;
        this.loginPading = show.isShow.loginPading;
      }
    }
}
