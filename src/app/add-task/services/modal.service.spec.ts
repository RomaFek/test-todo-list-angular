import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { of } from 'rxjs';
import { AddTaskComponent } from '../component/add-task.component';
import { ProfileComponent } from '../../profile/profile.component';
import { AddCollectModalComponent } from '../../collections/add-collect-modal/component/add-collect-modal.component';
import { MiniTaskComponent } from '../../main-page/mini-task/component/mini-task.component';
import { ITask } from '../../shared/model/task-model';
import { ErrorModalComponent } from '../../error-modal/error-modal.component';

describe('ModalService', () => {
    let modalService: ModalService;
    let dialog: MatDialog;

    beforeEach(() => {
        const dialogStub = {
            open: (component: any, config?: MatDialogConfig) => {
                return {
                    afterClosed: () => of(null),
                };
            },
        };

        TestBed.configureTestingModule({
            providers: [
                ModalService,
                { provide: MatDialog, useValue: dialogStub },
            ],
        });

        modalService = TestBed.inject(ModalService);
        dialog = TestBed.inject(MatDialog);
    });

    it('should be created', () => {
        expect(modalService).toBeTruthy();
    });

    it('should open AddTaskComponent modal', () => {
        spyOn(dialog, 'open').and.callThrough();
        modalService.openModal();
        expect(dialog.open).toHaveBeenCalledWith(
            AddTaskComponent,
            jasmine.any(Object),
        );
    });

    it('should open ProfileComponent modal', () => {
        spyOn(dialog, 'open').and.callThrough();
        modalService.openProfile();
        expect(dialog.open).toHaveBeenCalledWith(
            ProfileComponent,
            jasmine.any(Object),
        );
    });

    it('should open AddCollectModalComponent modal', () => {
        spyOn(dialog, 'open').and.callThrough();
        modalService.openAddCollect();
        expect(dialog.open).toHaveBeenCalledWith(AddCollectModalComponent);
    });

    it('should open MiniTaskComponent modal', () => {
        spyOn(dialog, 'open').and.callThrough();
        const task: ITask = {
            id: 1,
            description: 'Test Task',
            collectionTask: 'Test Collection',
            endDate: '2023-10-19T08:45:00',
            isCompleted: false,
        };
        modalService.openAddMiniTaskModal(task);
        expect(dialog.open).toHaveBeenCalledWith(
            MiniTaskComponent,
            jasmine.any(Object),
        );
    });

    it('should open ErrorModalComponent modal', () => {
        spyOn(dialog, 'open').and.callThrough();
        modalService.openModalError();
        expect(dialog.open).toHaveBeenCalledWith(ErrorModalComponent);
    });
});
