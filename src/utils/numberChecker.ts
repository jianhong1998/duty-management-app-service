export default class NumberChecker {
    static isStringValidNumber(numberInString: string): boolean {
        const number = Number.parseInt(numberInString);

        if (Number.isNaN(number)) {
            return false;
        }

        const digit = this.countIntegerDigit(number);

        return digit === numberInString.length;
    }

    static countIntegerDigit(number: number): number {
        if (number < 0) {
            return -1;
        }

        return Math.floor(Math.log10(number)) + 1;
    }
}
