import UserAccountService from '../userAccount/userAccountDB.service';
import bcrypt from 'bcrypt';
import TokenService from './token.service';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';
import LoginResult from '../../models/auth/loginResult.model';
import { UserAccountStatus } from '../../models/userAccount/UserAccountStatus.enum';

export default class LoginService {
    private static readonly INVALID_CREDENTIAL_MESSAGE =
        'Wrong email or password';

    static async login(email: string, password: string): Promise<LoginResult> {
        const user = await UserAccountService.getUserAccount(
            {
                emailAddress: email,
                accountStatus: UserAccountStatus.ACTIVE,
            },
            [
                {
                    model: EmployeeDBModel,
                },
            ],
        );

        if (user === null) {
            return {
                isLoginSuccess: false,
                message: this.INVALID_CREDENTIAL_MESSAGE,
            };
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return {
                isLoginSuccess: false,
                message: this.INVALID_CREDENTIAL_MESSAGE,
            };
        }

        const token = TokenService.generateToken({ userId: user.id });

        return {
            isLoginSuccess: true,
            token,
            name: user.employee.name,
        };
    }
}
