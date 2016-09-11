import { Component, ViewChild } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { SemanticPopupComponent } from "ng-semantic";
import "rxjs/add/operator/map";

@Component({
    selector: "app",
    templateUrl: "./client/template/app.component.html"
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
    @ViewChild("myPopup") myPopup: SemanticPopupComponent;

    constructor(private http: Http) {
        this.isLogged = !!localStorage.getItem("id_token");
    }

    signup() {
        this.http.post("/login/signup", JSON.stringify({ password: this.user.password, username: this.user.username }), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: any) => res.json())
            .subscribe(
                (res: Response) => {
                    this.response = res;
                },
                (error: Error) => { console.log(error); }
            );
    }

    login() {
        this.http.post("/login", JSON.stringify({ password: this.user.password }), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: Response) => res.json())
            .subscribe(
                (res: Response & { jwt: string }) => {
                    localStorage.setItem("id_token", res.jwt);
                    this.myPopup.hide();
                    location.reload();
                },
                (error: Error) => { console.log(error); }
            );
    }

    logout(): void {
        localStorage.removeItem("id_token");
        location.reload();
    }

    ngOnInit(){
      console.log("check login");

      let user: any;
      if(localStorage.getItem('user')){
        user = localStorage.getItem('user');
      } else{
        localStorage.setItem('user','');
        user = localStorage.getItem('user');
      }

      this.http.post("/login/checkLogin", JSON.stringify({ user: user}), new RequestOptions({
            headers: new Headers({"Content-Type": "application/json"})
        }))
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    //localStorage.setItem("id_token", res.jwt);
                    console.log("res = ", res);
                    if(res.status){
                        this.hiddenLogin = false;
                        this.loginPading = "225px";
                    }else{
                        this.loginPading = "0px";
                    }
                },
                (error: Error) => { console.log(error); }
            );
    }
}
