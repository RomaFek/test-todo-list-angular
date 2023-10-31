import { Pipe, PipeTransform } from '@angular/core';
import { format, isToday } from 'date-fns';

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {
    transform(value: string | null): string {
        if (value === null) {
            return '';
        }

        const date = new Date(value);
        const now = new Date();

        if (isToday(date)) {
            return `Today ${format(date, 'HH:mm')}`;
        } else if (date > now) {
            return `${format(date, 'dd.MM HH:mm')}`;
        } else {
            return 'WASTED';
        }
    }
}
