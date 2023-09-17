import UserAccountService from '../userAccount/userAccount.service';
import bcrypt from 'bcrypt';
import TokenService from './token.service';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';

type LoginResult =
    | {
          isLoginSuccess: true;
          token: string;
          name: string;
      }
    | {
          isLoginSuccess: false;
          message: string;
      };

export default class LoginService {
    static async login(email: string, password: string): Promise<LoginResult> {
        const user = await UserAccountService.getUserAccount(
            {
                emailAddress: email,
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
                message: 'Email is not registered',
            };
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return {
                isLoginSuccess: false,
                message: 'Password is incorrect',
            };
        }

        const token = TokenService.generateToken<{ userId: number }>({
            userId: user.id,
        });

        return {
            isLoginSuccess: true,
            token,
            name: user.employee?.name,
        };
    }
}
