export default interface IDateProvider {
    addDays(days: number): Date;
    addMinutes(minutes: number): Date;
}
