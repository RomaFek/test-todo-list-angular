import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/component/navbar.component';
import { DashboardComponent } from './backoffice/component/main-page/dashboard/component/dashboard.component';
import { CollectionsComponent } from './backoffice/component/collections/component/collections.component';
import { DialogModule } from '@angular/cdk/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './navbar/add-task/component/add-task.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipe } from './backoffice/component/main-page/dashboard/pipe/custom-date.pipe';
import { CollectionPageComponent } from './backoffice/component/collection-page/component/collection-page.component';
import { InputComponent } from './UI/input/input.component';
import { AuthComponent } from './auth/authorization/component/auth.component';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';
import { AddTaskInterceptor } from './interceptors/add-task.interceptor';
import { ProfileComponent } from './navbar/profile-modal/profile.component';
import { EditCollectionComponent } from './backoffice/component/collection-page/edit-collection/edit-collection.component';
import { AddCollectModalComponent } from './backoffice/component/collections/add-collect-modal/component/add-collect-modal.component';
import { AddCollectionInterceptor } from './interceptors/add-collection.interceptor';
import { MiniTaskComponent } from './backoffice/component/main-page/add-mini-task/component/mini-task.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { WhatsTimePipe } from './backoffice/component/main-page/dashboard/pipe/whats-time.pipe';
import { CurrentTaskPipe } from './backoffice/component/main-page/dashboard/pipe/current-task.pipe';
import { CardTaskComponent } from './backoffice/component/main-page/card-task/component/card-task.component';
import { TaskBoardComponent } from './backoffice/component/collection-page/task-board/task-board.component';
import { CardBodyComponent } from './backoffice/component/main-page/card-task/card-body/card-body.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { CustomCheckboxComponent } from './UI/custom-checkbox/custom-checkbox.component';

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
        ProfileComponent,
        EditCollectionComponent,
        AddCollectModalComponent,
        MiniTaskComponent,
        ErrorModalComponent,
        WhatsTimePipe,
        CurrentTaskPipe,
        TaskBoardComponent,
        CardBodyComponent,
        BackofficeComponent,
        CustomCheckboxComponent,
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
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
