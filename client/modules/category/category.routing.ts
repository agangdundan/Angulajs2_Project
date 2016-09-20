import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category_list/category_list.component';
// import { FormComponent } from "./form/form.component";

export const routes: Routes = [
    { path: 'category_list', component: CategoryListComponent, pathMatch: "full" },
//     { path: 'contact/form', component: FormComponent }
];

export const routing = RouterModule.forChild(routes);
