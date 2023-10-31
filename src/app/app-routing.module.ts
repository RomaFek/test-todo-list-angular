import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthComponent } from './auth/authorization/component/auth.component';
import { MainGuard } from './backoffice/component/main-page/dashboard/guard/main.guard';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CollectionPageComponent } from './backoffice/component/collection-page/component/collection-page.component';
import { DashboardComponent } from './backoffice/component/main-page/dashboard/component/dashboard.component';
import { CardTaskComponent } from './backoffice/component/main-page/card-task/component/card-task.component';
import { CollectionsComponent } from './backoffice/component/collections/component/collections.component';

const routes: Routes = [
    {
        path: '',
        component: BackofficeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                children: [
                    { path: '', redirectTo: '/todo', pathMatch: 'full' },
                    { path: 'todo', component: CardTaskComponent },
                    { path: 'wasted', component: CardTaskComponent },
                    { path: 'today', component: CardTaskComponent },
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
        ],
    },
    {
        path: 'authorization',
        component: AuthComponent,
        canActivate: [MainGuard],
    },
    { path: '**', redirectTo: 'todo' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
