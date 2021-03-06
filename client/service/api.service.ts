import { Injectable } from "@angular/core";
// import { AuthHttp } from "angular2-jwt";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class ApiService {

    constructor(private http: Http) {}

    get(url: string) {
        return this
            .http
            .get(url)
            .map((response: Response) => response.json());
    }

    post(url: string, param:any) {
        return this
            .http
            .post(url, JSON.stringify(param), new RequestOptions({
                headers: new Headers({"Content-Type": "application/json"})
            }))
            .map((response: Response) => response.json());
    }
}
