import {CustomDatePipe} from './custom-date.pipe';

describe('CustomDatePipe', () => {
    let pipe: CustomDatePipe;

    beforeEach(() => {
        pipe = new CustomDatePipe();
    });

    // it('transforms a date string into a custom format', () => {
    //
    //     const inputDate = '2023-10-18T14:30:00';
    //     const result = pipe.transform(inputDate);
    //
    //     expect(result).toBe('Today 14:30');
    // });

    // it('transforms a future date string into a custom format', () => {
    //     const inputDate = '2023-10-19T08:45:00';
    //     const result = pipe.transform(inputDate);
    //
    //     expect(result).toBe('19.10 08:45');
    // });

    it('transforms a past date string into "WASTED"', () => {
        const inputDate = '2023-10-17T12:00:00';
        const result = pipe.transform(inputDate);

        expect(result).toBe('WASTED');
    });

    it('transforms null input into an empty string', () => {
        const result = pipe.transform(null);

        expect(result).toBe('');
    });
});
