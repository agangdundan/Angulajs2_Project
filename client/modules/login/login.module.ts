import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from "@angular/http";
import { NgSemanticModule } from "ng-semantic";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login.component";
import { routing } from "./login.routing";
import { SharedModule } from "../shared/shared.module";
//import { ContactModule } from "../contact/contact.module";

@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        routing,
        SharedModule.forRoot(),
        NgSemanticModule
        //ContactModule
    ],
    declarations: [
        LoginComponent
    ],
    bootstrap: [
        LoginComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class LoginModule { }