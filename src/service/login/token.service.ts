import jwt from 'jsonwebtoken';
import ITokenPayload from '../../models/auth/tokenPayload.model';

export default class TokenService {
    private static readonly DUMMY_JWT_SECRET = 'jwt123';

    static generateToken(payload: ITokenPayload): string {
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
            console.log((error as Error).message);
            return false;
        }
    }

    static decodeToken(token: string): ITokenPayload {
        const { userId } = jwt.decode(token) as unknown as { userId: number };

        return {
            userId,
        };
    }
}
