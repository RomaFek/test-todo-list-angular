import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {
    transform(value: string | null): string {
        if (value === null) {
            return '';
        }

        const date = new Date(value);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if (date >= today && date < tomorrow) {
            return `Today ${formatTime(date)}`;
        } else if (date >= tomorrow) {
            return `${formatDate(date)} ${formatTime(date)}`;
        } else {
            return 'WASTED';
        }
    }
}

function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
}
