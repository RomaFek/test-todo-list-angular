import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateFormatService {
    constructor() {}

    public formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    public formatWastedDate(date: Date): number {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return Number(`${year}${month}${day}`);
    }

    public convertor(str: string): number {
        const numericStr = str.replace(/-/g, '');
        return Number(numericStr);
    }
}
