import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category_list/category_list.component';
import { CategoryManageComponent } from './category_manage/category_manage.component';
// import { FormComponent } from "./form/form.component";

export const routes: Routes = [
    { path: 'category_list', component: CategoryListComponent, pathMatch: "full" },
    { path: 'category_list/create_cate/:id', component: CategoryManageComponent }
];

export const routing = RouterModule.forChild(routes);
