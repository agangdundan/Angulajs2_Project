import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { routing } from "./setting.routing";
import { SharedModule } from "../shared/shared.module";
import { StaffSetting } from "./staff_setting/staff_setting.component";
// import { CategoryManageComponent } from './category_manage/category_manage.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        SharedModule.forRoot()
    ],
    declarations: [ StaffSetting, /*CategoryManageComponent*/],
    bootstrap:    [ StaffSetting ],
})
export class SettingModule { }
