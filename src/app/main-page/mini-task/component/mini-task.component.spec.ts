import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MiniTaskComponent} from './mini-task.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {AddMiniTaskService} from '../../card-task/service/add-mini-task.service';
import {of} from "rxjs";

describe('MiniTaskComponent', () => {
    let component: MiniTaskComponent;
    let fixture: ComponentFixture<MiniTaskComponent>;
    let dialogRefSpy: jasmine.SpyObj<DialogRef>
    let addMiniTaskServiceSpy: jasmine.SpyObj<AddMiniTaskService>;

    beforeEach(() => {
        dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);
        addMiniTaskServiceSpy = jasmine.createSpyObj('AddMiniTaskService', ['setNewMiniTask']);

        TestBed.configureTestingModule({
            declarations: [MiniTaskComponent],
            imports: [FormsModule, ReactiveFormsModule, MatDialogModule],
            providers: [
                {provide: DIALOG_DATA, useValue: {coll: {id: 1}}},
                {provide: DialogRef, useValue: dialogRefSpy},
                {provide: AddMiniTaskService, useValue: addMiniTaskServiceSpy},
            ],

        });

        fixture = TestBed.createComponent(MiniTaskComponent);
        component = fixture.componentInstance;
    });

    it('should create MiniTaskComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should call onSubmit and close dialog', () => {
        const description = 'Sample subtask description';
        component.newMiniTask.setValue(description);

        addMiniTaskServiceSpy.setNewMiniTask.and.returnValue(of({id: 1, task_id: 1, description: '1212312', isCompleted: false}));

        component.onSubmit();

        expect(addMiniTaskServiceSpy.setNewMiniTask).toHaveBeenCalledWith({
            id: jasmine.any(Number),
            task_id: 1,
            description,
            isCompleted: false,
        });
        expect(dialogRefSpy.close).toHaveBeenCalled();
    });

    it('should not call onSubmit when newMiniTask is empty', () => {
        component.newMiniTask.setValue('');

        component.onSubmit();

        expect(addMiniTaskServiceSpy.setNewMiniTask).toHaveBeenCalledTimes(0);
    });

});
