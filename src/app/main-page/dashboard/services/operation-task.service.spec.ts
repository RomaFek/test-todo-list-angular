import {TestBed} from '@angular/core/testing';
import {OperationTaskService} from './operation-task.service';

describe('OperationTaskService', () => {
    let service: OperationTaskService;

    beforeEach((done) => {
        const openRequest = indexedDB.open("store", 5);

        openRequest.onupgradeneeded = function (event) {
            const db = openRequest.result;

            if (!db.objectStoreNames.contains("TodoListStore")) {
                const tasks = db.createObjectStore("TodoListStore", {keyPath: "id"});
            }
        };

        openRequest.onsuccess = function (event) {
            const db = openRequest.result;
            const transaction = db.transaction("TodoListStore", "readwrite");
            const TodoListStore = transaction.objectStore("TodoListStore");

            // Добавляем задачи в IndexedDB
            const task1 = {id: 1, description: "Task 1", endDate: "2023-10-01", collectionTask: "Work", isCompleted: false};
            const task2 = {id: 2, description: "Task 2", endDate: "2023-10-02", collectionTask: "Personal", isCompleted: true};

            TodoListStore.add(task1);
            TodoListStore.add(task2);

            done();
        };

        TestBed.configureTestingModule({});
        service = TestBed.inject(OperationTaskService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an array of tasks', (done: DoneFn) => {
        service.getAllTask().subscribe((tasks) => {
            expect(Array.isArray(tasks)).toBe(true);
            expect(tasks.length).toBeGreaterThan(0);
            done();
        });
    });

    it('should return tasks with expected properties', (done: DoneFn) => {
        service.getAllTask().subscribe((tasks) => {
            const task = tasks[0];
            expect(task).toBeTruthy();
            expect(task.id).toBeDefined();
            expect(task.description).toBeDefined();
            expect(task.endDate).toBeDefined();
            expect(task.collectionTask).toBeDefined();
            expect(task.isCompleted).toBeDefined();
            done();
        });
    });
});
