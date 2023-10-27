import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionsComponent } from './collections/component/collections.component';
import { DashboardComponent } from './main-page/dashboard/component/dashboard.component';
import { CollectionPageComponent } from './collection-page/component/collection-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthComponent } from './auth/authorization/component/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MainGuard } from './main-page/dashboard/guard/main.guard';
import { CardTaskComponent } from './main-page/card-task/component/card-task.component';
import { CardTodayTaskComponent } from './main-page/card-today-task/card-today-task.component';
import { CardWastedTaskComponent } from './main-page/card-wasted-task/card-wasted-task.component';

const routes: Routes = [
    { path: '', redirectTo: '/todo', pathMatch: 'full' },
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: 'todo', component: CardTaskComponent },
            { path: 'wasted', component: CardWastedTaskComponent },
            { path: 'today', component: CardTodayTaskComponent },
        ],
        canActivate: [AuthGuard],
    },
    {
        path: 'collections',
        component: CollectionsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'collections/:collectionTask',
        component: CollectionPageComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'authorization',
        component: AuthComponent,
        canActivate: [MainGuard],
    },
    {
        path: 'registration',
        component: RegistrationComponent,
        canActivate: [MainGuard],
    },
    { path: '**', redirectTo: 'todo' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
