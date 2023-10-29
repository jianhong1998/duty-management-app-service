export default class EmailValidationUtil {
    static isEmailValid(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }
}
