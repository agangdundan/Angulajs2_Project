import { Injectable } from "@angular/core";
import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";


@Injectable()
export class pmslnService {
  
  constructor(private http: Http) {
      // console.log("check some thing");
  }

  isLogin(){
      //console.log("service check login");
      //let config = new RequestOptions({headers: new Headers({"Content-Type": "application/json"})});
      this.http.get("/login/checkLogin")
            .map((res: Response) => res.json())
            .subscribe(
                (res) => {
                    // console.log("res = ", res);
                    if(!res.status){
                        window.location.href = "#/login";
                    }
                },
                (error: Error) => { console.log(error); }
            );

    }
}