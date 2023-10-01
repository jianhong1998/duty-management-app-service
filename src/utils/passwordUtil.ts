import bcrypt from 'bcrypt';

export default class PasswordUtil {
    static encryptPassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }
}
