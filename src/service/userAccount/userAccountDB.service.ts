import { Includeable, Transaction, WhereOptions } from 'sequelize';
import IUserAccount, {
    IUserAccountCreation,
} from '../../models/userAccount/userAccount.model';
import UserAccountDBModel from '../../models/userAccount/userAccountDBModel.model';
import { UserAccountStatus } from '../../models/userAccount/userAccount.enum';

export default class UserAccountService {
    static async getUserAccount(
        condition: WhereOptions<UserAccountDBModel>,
        include?: Includeable[],
        transaction?: Transaction,
    ): Promise<IUserAccount | null> {
        const userAccount = await UserAccountDBModel.findOne({
            where: condition,
            include,
            transaction,
        });

        return userAccount?.dataValues || null;
    }

    static async createUserAccount(
        userAccountCreation: IUserAccountCreation,
        transaction?: Transaction,
    ): Promise<IUserAccount> {
        const createdUserAccount = await UserAccountDBModel.create(
            userAccountCreation,
            { transaction },
        );

        if (createdUserAccount === null) {
            throw new Error('createdUserAccount is null');
        }

        return createdUserAccount.dataValues;
    }

    static async updateUserAccounts(
        condition: WhereOptions<UserAccountDBModel>,
        data: Partial<IUserAccount>,
        transaction?: Transaction,
    ): Promise<IUserAccount[]> {
        await UserAccountDBModel.update(data, {
            where: condition,
            transaction,
        });

        const userAccounts = await UserAccountDBModel.findAll({
            where: condition,
        });

        return userAccounts.map((userAccount) => userAccount.dataValues);
    }

    static async deleteUserAccounts(
        condition: WhereOptions<UserAccountDBModel>,
        transaction?: Transaction,
    ): Promise<IUserAccount[]> {
        await UserAccountDBModel.update(
            { accountStatus: UserAccountStatus.DISABLED },
            {
                where: condition,
                transaction,
            },
        );

        return await UserAccountDBModel.findAll({
            where: condition,
            transaction,
        });
    }

    static async reactivateUserAccunts(
        condition: WhereOptions<UserAccountDBModel>,
        transaction?: Transaction,
    ): Promise<IUserAccount[]> {
        await UserAccountDBModel.update(
            {
                accountStatus: UserAccountStatus.ACTIVE,
            },
            {
                where: condition,
                transaction,
            },
        );

        return await UserAccountDBModel.findAll({
            where: condition,
            transaction,
        });
    }

    static async isEmailAddressRegistered(
        emailAddress: string,
    ): Promise<boolean> {
        return (
            (await UserAccountDBModel.count({
                where: {
                    emailAddress,
                },
            })) > 0
        );
    }
}
