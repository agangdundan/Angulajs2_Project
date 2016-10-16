import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { provideAuth } from "angular2-jwt";
import { HttpModule } from "@angular/http";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
// import { NgSemanticModule } from "ng-semantic";

import { AppComponent }  from './app.component';
import { routing } from "./routes";
import { MenuComponent } from "./components/shared/menu.component";
import { LoginModule } from "./modules/login/login.module";
import { ContactModule } from "./modules/contact/contact.module";
import { HomeModule } from "./modules/home/home.module";
import { CategoryModule } from "./modules/category/category.module";
import { SettingModule } from "./modules/setting/setting.module";
import { SharedModule } from "./modules/shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ToastModule,
        // NgSemanticModule,
        LoginModule,
        ContactModule,
        HomeModule,
        CategoryModule,
        SettingModule,
        routing,
        SharedModule.forRoot()
    ],
    // providers: [
    //     provideAuth({
    //         globalHeaders: [{"Content-type": "application/json"}],
    //         newJwtError: true,
    //         noTokenScheme: true
    //     })
    // ],
    declarations: [ MenuComponent, AppComponent ],
    bootstrap:    [ AppComponent ],
    schemas: [
        // CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
