import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class FilterTable {

    private temp = [];
    constructor() {
        // console.log("check some thing");
    }

    filter(cals:any[], data:any[], find:string, start:number, lows:number){
        this.temp = [];
        for(let i = 0; i < data.length; i++){
            if(find == ""){
                this.temp.push(data[i]);
                continue;
            }
            for (let key in data[i]){
                // console.log("data[i]["+ key +"]="+ data[i][key]);
                let str = data[i][key].toString();
                if(str.indexOf(find) >= 0 ){
                    this.temp.push(data[i]);
                    break;
                }
            }
        }
        // console.log(this.temp.slice((start*lows)-lows, start*lows));
        return this.temp.slice((start*lows)-lows, start*lows);
    }

}