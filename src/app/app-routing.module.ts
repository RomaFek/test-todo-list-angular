import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CollectionsComponent} from "./collections/component/collections.component";
import {DashboardComponent} from "./main-page/dashboard/component/dashboard.component";
import {CollectionPageComponent} from "./collection-page/component/collection-page.component";
import {authGuard} from "./auth/guard/auth.guard";
import {AuthComponent} from "./auth/authorization/component/auth.component";
import {RegistrationComponent} from "./auth/registration/registration.component";
import {mainGuard} from "./main-page/dashboard/guard/main.guard";


const routes: Routes = [

    {path: '', component: DashboardComponent, canActivate: [authGuard]},
    {path: 'collections', component: CollectionsComponent, canActivate: [authGuard]},
    {path: 'collections/:collectionTask', component: CollectionPageComponent, canActivate: [authGuard]},
    {path: 'authorization', component: AuthComponent, canActivate: [mainGuard]},
    {path: 'registration', component: RegistrationComponent, canActivate: [mainGuard]},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
