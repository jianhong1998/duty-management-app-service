import jwt from 'jsonwebtoken';

export default class TokenService {
    private static readonly DUMMY_JWT_SECRET = 'jwt123';

    static generateToken<T extends object>(payload: T): string {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET || this.DUMMY_JWT_SECRET,
        );
    }

    static verifyToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET || this.DUMMY_JWT_SECRET);
            return true;
        } catch (error) {
            console.log(error.message);
            return false;
        }
    }
}
