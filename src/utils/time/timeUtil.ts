export default class TimeUtil {
    static convertDateObjectToTimeString(date: Date): string {
        return date.toLocaleTimeString('en-SG', {
            hour12: false,
            hourCycle: 'h23',
        });
    }
}
