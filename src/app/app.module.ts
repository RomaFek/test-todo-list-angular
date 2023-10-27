import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/component/navbar.component';
import { DashboardComponent } from './main-page/dashboard/component/dashboard.component';
import { CollectionsComponent } from './collections/component/collections.component';
import { DialogModule } from '@angular/cdk/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './add-task/component/add-task.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './main-page/sidenav/sidenav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipe } from './main-page/dashboard/pipe/custom-date.pipe';
import { CollectionPageComponent } from './collection-page/component/collection-page.component';
import { InputComponent } from './main-page/input/input/input.component';
import { AuthComponent } from './auth/authorization/component/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';
import { AddTaskInterceptor } from './interceptors/add-task.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { EditCollectionComponent } from './collection-page/edit-collection/edit-collection.component';
import { AddCollectModalComponent } from './collections/add-collect-modal/component/add-collect-modal.component';
import { AddCollectionInterceptor } from './interceptors/add-collection.interceptor';
import { MiniTaskComponent } from './main-page/mini-task/component/mini-task.component';
import { AddMiniTaskInterceptor } from './interceptors/add-mini-task.interceptor';
import { MiniTaskInputComponent } from './main-page/input/mini-task-input/mini-task-input.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { environment } from '../enviroment';
import { WhatsTimePipe } from './main-page/dashboard/pipe/whats-time.pipe';
import { CurrentTaskPipe } from './main-page/dashboard/pipe/current-task.pipe';
import { CardTaskComponent } from './main-page/card-task/component/card-task.component';
import { CardTodayTaskComponent } from './main-page/card-today-task/card-today-task.component';
import { CardWastedTaskComponent } from './main-page/card-wasted-task/card-wasted-task.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        CollectionsComponent,
        AddTaskComponent,
        SidenavComponent,
        CustomDatePipe,
        CollectionPageComponent,
        CardTaskComponent,
        InputComponent,
        AuthComponent,
        RegistrationComponent,
        CardTodayTaskComponent,
        CardWastedTaskComponent,
        ProfileComponent,
        EditCollectionComponent,
        AddCollectModalComponent,
        MiniTaskComponent,
        MiniTaskInputComponent,
        ErrorModalComponent,
        WhatsTimePipe,
        CurrentTaskPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        DialogModule,
        BrowserAnimationsModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatDialogModule,
        FormsModule,
    ],
    providers: [
        {
            provide: 'nameDbTasks',
            useValue: environment.nameDbTasks,
        },
        {
            provide: 'nameDbSubTasks',
            useValue: environment.nameDbSubTasks,
        },
        {
            provide: 'nameDbCollections',
            useValue: environment.nameDbCollections,
        },
        {
            provide: 'nameDbUsers',
            useValue: environment.nameDbUsers,
        },
        {
            provide: 'versionDB',
            useValue: environment.versionDB,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddTaskInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RegistrationInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddCollectionInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AddMiniTaskInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
