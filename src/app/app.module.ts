import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './backoffice/components/dashboard/dashboard.component';
import { CollectionsComponent } from './backoffice/components/collections/collections.component';
import { DialogModule } from '@angular/cdk/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTaskComponent } from './navbar/components/add-task/add-task.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CustomDatePipe } from './backoffice/components/dashboard/pipe/custom-date.pipe';
import { CollectionPageComponent } from './backoffice/components/collection-page/collection-page.component';
import { InputComponent } from './UI/input/input.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';
import { AddTaskInterceptor } from './interceptors/add-task.interceptor';
import { ProfileComponent } from './navbar/components/profile-modal/profile.component';
import { EditCollectionComponent } from './backoffice/components/collection-page/components/edit-collection/edit-collection.component';
import { AddCollectModalComponent } from './backoffice/components/collections/components/add-collect-modal/add-collect-modal.component';
import { AddCollectionInterceptor } from './interceptors/add-collection.interceptor';
import { MiniTaskComponent } from './backoffice/components/dashboard/components/add-sub-task/mini-task.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { WhatsTimePipe } from './backoffice/components/dashboard/pipe/whats-time.pipe';
import { CurrentTaskPipe } from './backoffice/components/dashboard/pipe/current-task.pipe';
import { CardTaskComponent } from './backoffice/components/dashboard/components/card-task/card-task.component';
import { TaskBoardComponent } from './backoffice/components/collection-page/components/task-board/task-board.component';
import { CardBodyComponent } from './backoffice/components/dashboard/components/card-task/components/card-body/card-body.component';
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
