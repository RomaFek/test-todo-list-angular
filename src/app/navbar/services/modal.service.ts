import { Injectable } from '@angular/core';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileComponent } from '../components/profile-modal/profile.component';
import { AddCollectModalComponent } from '../../backoffice/components/collections/components/add-collect-modal/add-collect-modal.component';
import { MiniTaskComponent } from '../../backoffice/components/dashboard/components/add-sub-task/mini-task.component';
import { ITask } from '../../shared/model/task-model';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    constructor(private dialog: MatDialog) {}

    public openModal() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        return this.dialog.open(AddTaskComponent, dialogConfig);
    }

    public openProfile() {
        this.dialog.open<ProfileComponent>(ProfileComponent, {
            position: {
                top: '80px',
                right: '0px',
            },
        });
    }

    public openAddCollect() {
        this.dialog.open<AddCollectModalComponent>(AddCollectModalComponent);
    }

    public openAddMiniTaskModal(coll: ITask) {
        this.dialog.open<MiniTaskComponent>(MiniTaskComponent, {
            data: { coll },
        });
    }

    public openModalError() {
        this.dialog.open<ErrorModalComponent>(ErrorModalComponent);
    }
}
