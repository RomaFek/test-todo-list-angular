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
import { InputComponent } from './UI/input/input.component';
import { AuthComponent } from './auth/authorization/component/auth.component';
import { RegistrationInterceptor } from './interceptors/registration.interceptor';
import { AddTaskInterceptor } from './interceptors/add-task.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { EditCollectionComponent } from './collection-page/edit-collection/edit-collection.component';
import { AddCollectModalComponent } from './collections/add-collect-modal/component/add-collect-modal.component';
import { AddCollectionInterceptor } from './interceptors/add-collection.interceptor';
import { MiniTaskComponent } from './main-page/mini-task/component/mini-task.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { WhatsTimePipe } from './main-page/dashboard/pipe/whats-time.pipe';
import { CurrentTaskPipe } from './main-page/dashboard/pipe/current-task.pipe';
import { CardTaskComponent } from './main-page/card-task/component/card-task.component';
import { TaskBoardComponent } from './collection-page/task-board/task-board.component';
import { CardBodyComponent } from './main-page/card-task/card-body/card-body.component';
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
