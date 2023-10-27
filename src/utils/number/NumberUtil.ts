export default class NumberUtil {
    static generateRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * max) + min;
    }
}
