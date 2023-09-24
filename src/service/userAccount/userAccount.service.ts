import { Includeable, WhereOptions } from 'sequelize';
import IUserAccount from '../../models/userAccount/userAccount.model';
import UserAccountDBModel from '../../models/userAccount/userAccountDBModel.model';

export default class UserAccountService {
    static async getUserAccount(
        condition: WhereOptions<UserAccountDBModel>,
        include?: Includeable[],
    ): Promise<IUserAccount | null> {
        const userAccounts = await UserAccountDBModel.findOne({
            where: condition,
            include,
        });

        return userAccounts?.dataValues || null;
    }
}
