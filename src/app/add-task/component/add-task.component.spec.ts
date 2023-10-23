// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {AddTaskComponent} from './add-task.component';
// import {FormControl, FormGroup} from '@angular/forms';
//
// describe('AddTaskComponent', () => {
//     let component: AddTaskComponent;
//     let fixture: ComponentFixture<AddTaskComponent>;
//
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             declarations: [AddTaskComponent],
//         });
//
//         fixture = TestBed.createComponent(AddTaskComponent);
//         component = fixture.componentInstance;
//     });
//
//     it('should create a form with the correct form controls', () => {
//         fixture.detectChanges();
//
//         const formGroup = component.newTaskGroup as FormGroup;
//
//         expect(formGroup.contains('description')).toBeTruthy();
//         expect(formGroup.contains('endDate')).toBeTruthy();
//         expect(formGroup.contains('collectionTask')).toBeTruthy();
//
//         expect(formGroup.get('description')).toBeInstanceOf(FormControl);
//         expect(formGroup.get('endDate')).toBeInstanceOf(FormControl);
//         expect(formGroup.get('collectionTask')).toBeInstanceOf(FormControl);
//     });
// });
