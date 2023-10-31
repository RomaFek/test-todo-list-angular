import { Injectable } from '@angular/core';
import { AddTaskComponent } from '../component/add-task.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileComponent } from '../../profile-modal/profile.component';
import { AddCollectModalComponent } from '../../../backoffice/component/collections/add-collect-modal/component/add-collect-modal.component';
import { MiniTaskComponent } from '../../../backoffice/component/main-page/add-mini-task/component/mini-task.component';
import { ITask } from '../../../shared/model/task-model';
import { ErrorModalComponent } from '../../../shared/error-modal/error-modal.component';

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
