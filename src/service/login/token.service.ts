import jwt from 'jsonwebtoken';

export default class TokenService {
    static generateToken<T extends object>(payload: T): string {
        return jwt.sign(payload, process.env.JWT_SECRET || 'jwt123');
    }
}
