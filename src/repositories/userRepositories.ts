import { Op } from "sequelize";
import User from "../models/User";


export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
};

export const createUser = async (data: any) => {
    return await User.create(data);
};

export const findUserById = async (id: number) => {
    const user = await User.findOne({ where: { id } });
    return user ? user.get({ plain: true }) : null;
};

export const updateVerifiedUser = async (id: number) => {
    return await User.update(
        { status: 1, otp: null },
        { where: { id } }
    );
}

export const getCsrfToken = async () => {
    const res = await fetch('/csrf-token', {
        credentials: 'include' // important if using cookies
    });
    const data = await res.json();
    return data.csrfToken;
};

export const findNonVerifiedUsers = async () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const deletedCount = await User.destroy({
        where: {
            otp: { [Op.ne]: null },
            status: 0,
            createdAt: { [Op.lt]: tenMinutesAgo },
        },
    });

    return deletedCount;
};