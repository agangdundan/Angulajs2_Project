import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { routing } from "./category.routing";
import { SharedModule } from "../shared/shared.module";
import { CategoryListComponent } from "./category_list/category_list.component";
import { CategoryManageComponent } from './category_manage/category_manage.component';
// import { FormComponent } from "./form/form.component";
// import { ProfileComponent } from "./profile/profile.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        SharedModule.forRoot()
    ],
    // exports: [ ProfileComponent ],
    declarations: [ CategoryListComponent, CategoryManageComponent],
    bootstrap:    [ CategoryListComponent ],
})
export class CategoryModule { }
