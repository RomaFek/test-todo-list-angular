import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-error-modal',
    templateUrl: './error-modal.component.html',
    styleUrls: ['./error-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorModalComponent {
    constructor() {
    }


    protected readonly window = window;
}
