import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {OperationTaskService} from "../dashboard/services/operation-task.service";
import {Observable} from "rxjs";
import {ITask} from "../../add-task/models/task-model";
import {UniqCollectionService} from "../../collections/service/uniq-collection.service";

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {
    public yourTask$!: Observable<ITask[]>

    constructor(private operationTaskService: OperationTaskService, public uniqCollectionService: UniqCollectionService) {
    }

    ngOnInit() {
        this.yourTask$ = this.operationTaskService.getAllTask()
    }

}
