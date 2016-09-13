import { Component } from "@angular/core";
import { ApiService } from "../../service/api.service";

@Component({
    selector: "home",
    templateUrl: `client/modules/login/login.component.html`
})
export class LoginComponent {
    error: string;
    response: {};

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService
            .get("/login/login")
            .subscribe(
                (res) => { 
                    console.log("res login = ", res); 
                },
                (error: Error) => {
                    this.error = error.message;
                    setTimeout(() => this.error = null, 4000)
                });
    }

    login(){
        console.log("click login");
    }
}
