import { addHours, addDays, addWeeks, addMonths, addYears, addMinutes } from 'date-fns';



function calculateExpirationDate(duration: string): Date {
    const [amount, unit] = duration.split(/(\d+)/).filter(Boolean);
    let expirationDate: Date;
    switch (unit) {
        case 't':
            expirationDate = addMinutes(new Date(), Number(amount));
            break;
        case 'h':
            expirationDate = addHours(new Date(), Number(amount));
            break;
        case 'd':
            expirationDate = addDays(new Date(), Number(amount));
            break;
        case 'w':
            expirationDate = addWeeks(new Date(), Number(amount));
            break;
        case 'm':
            expirationDate = addMonths(new Date(), Number(amount));
            break;
        case 'y':
            expirationDate = addYears(new Date(), Number(amount));
            break;
        default:
            expirationDate = addHours(new Date(), 24);
    }
    return expirationDate;
};



export default calculateExpirationDate;