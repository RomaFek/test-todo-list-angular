import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guard/auth.guard';
import { AuthComponent } from './auth/auth.component';
import { MainGuard } from './backoffice/components/dashboard/guard/main.guard';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CollectionPageComponent } from './backoffice/components/collection-page/collection-page.component';
import { DashboardComponent } from './backoffice/components/dashboard/dashboard.component';
import { CardTaskComponent } from './backoffice/components/dashboard/components/card-task/card-task.component';
import { CollectionsComponent } from './backoffice/components/collections/collections.component';

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
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
