import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default class PasswordUtil {
    public static encryptPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public static comparePassword(
        inputPassword: string,
        encodedPassword: string,
    ): boolean {
        return bcrypt.compareSync(inputPassword, encodedPassword);
    }

    public static generateNewPassword(passwordLength: number): string {
        const charset =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        const randomBytes = crypto.randomBytes(passwordLength);

        for (let i = 0; i < randomBytes.length; i++) {
            const chosenIndex = randomBytes[i] % charset.length;
            password += charset[chosenIndex];
        }

        return password;
    }
}
