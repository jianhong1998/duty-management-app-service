import { Includeable, WhereOptions } from 'sequelize';
import IUserAccount, {
    IUserAccountCreation,
} from '../../models/userAccount/userAccount.model';
import UserAccountDBModel from '../../models/userAccount/userAccountDBModel.model';

export default class UserAccountService {
    static async getUserAccount(
        condition: WhereOptions<UserAccountDBModel>,
        include?: Includeable[],
    ): Promise<IUserAccount | null> {
        const userAccount = await UserAccountDBModel.findOne({
            where: condition,
            include,
        });

        return userAccount?.dataValues || null;
    }

    static async createUserAccount(
        userAccountCreation: IUserAccountCreation,
    ): Promise<IUserAccount> {
        const createdUserAccount =
            await UserAccountDBModel.create(userAccountCreation);

        if (createdUserAccount === null) {
            throw new Error('createdUserAccount is null');
        }

        return createdUserAccount.dataValues;
    }

    static async updateUserAccounts(
        condition: WhereOptions<UserAccountDBModel>,
        data: Partial<IUserAccount>,
    ): Promise<IUserAccount[]> {
        await UserAccountDBModel.update(data, { where: condition });

        const userAccounts = await UserAccountDBModel.findAll({
            where: condition,
        });

        return userAccounts.map((userAccount) => userAccount.dataValues);
    }
}
