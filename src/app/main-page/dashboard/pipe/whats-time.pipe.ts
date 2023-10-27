import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'whatsTime',
})
export class WhatsTimePipe implements PipeTransform {
    transform(value: null): string {
        const now = new Date();
        const hours = now.getHours();

        let greeting: string;

        if (hours >= 5 && hours < 12) {
            greeting = 'Good morning';
        } else if (hours >= 12 && hours < 17) {
            greeting = 'Good afternoon';
        } else if (hours >= 17 && hours < 22) {
            greeting = 'Good evening';
        } else {
            greeting = 'Good night';
        }

        return greeting;
    }
}
