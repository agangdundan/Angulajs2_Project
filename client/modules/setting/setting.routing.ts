import { Routes, RouterModule } from '@angular/router';

import { StaffSetting } from './staff_setting/staff_setting.component';
// import { CategoryManageComponent } from './category_manage/category_manage.component';

export const routes: Routes = [
    { path: 'setting', component: StaffSetting },
    // { path: 'category_list/create_cate/:id', component: CategoryManageComponent }
];

export const routing = RouterModule.forChild(routes);
