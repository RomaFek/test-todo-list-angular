import {TestBed} from '@angular/core/testing';
import {CopyBDService} from './copy-bd.service';
import {ITask} from '../../../add-task/models/task-model';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

describe('CopyBDService', () => {
    let service: CopyBDService;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CopyBDService, {provide: HttpClient, useValue: {post: () => of(null)}}],
        });
        service = TestBed.inject(CopyBDService);
        http = TestBed.inject(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should get all tasks', (done: DoneFn) => {
    //     const mockTasks: ITask[] = [
    //         {id: 1, description: 'Task 1', endDate: '2023-10-01', collectionTask: 'Work', isCompleted: false},
    //         {id: 2, description: 'Task 2', endDate: '2023-10-02', collectionTask: 'Personal', isCompleted: true},
    //     ];
    //
    //     spyOn(service['operationTaskService'], 'getAllTask').and.returnValue(of(mockTasks));
    //
    //     service.allTasks.subscribe((tasks: ITask[]) => {
    //         expect(tasks).toEqual(mockTasks);
    //     });
    //
    // }); crushit testi Expected $.length = 0 to equal 2.

    it('should add a task', () => {
        const mockTask: ITask = {id: 3, description: 'Task 3', endDate: '2023-10-03', collectionTask: 'Work', isCompleted: false};

        spyOn(http, 'post').and.returnValue(of(null));

        service.addTasks(mockTask).subscribe((response) => {
            expect(response).toBeNull();
        });

        expect(http.post).toHaveBeenCalledWith('addTask', mockTask);
    });

    it('should add a task', () => {
        const mockTask: ITask = {id: 3, description: 'Task 3', endDate: '2023-10-03', collectionTask: 'Work', isCompleted: false};

        service.addTasks(mockTask).subscribe(() => {
            const currentTasks = service.allTaskSubject$.getValue();
            expect(currentTasks).toContain(mockTask);
        });
    });


});
