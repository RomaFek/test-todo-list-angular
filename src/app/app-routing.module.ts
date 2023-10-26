import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionsComponent} from "./collections/component/collections.component";
import {DashboardComponent} from "./main-page/dashboard/component/dashboard.component";
import {CollectionPageComponent} from "./collection-page/component/collection-page.component";
import {AuthGuard} from "./auth/guard/auth.guard";
import {AuthComponent} from "./auth/authorization/component/auth.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {MainGuard} from "./main-page/dashboard/guard/main.guard";


const routes: Routes = [

    {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'collections', component: CollectionsComponent, canActivate: [AuthGuard]},
    {path: 'collections/:collectionTask', component: CollectionPageComponent, canActivate: [AuthGuard]},
    {path: 'authorization', component: AuthComponent, canActivate: [MainGuard]},
    {path: 'registration', component: RegistrationComponent, canActivate: [MainGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
