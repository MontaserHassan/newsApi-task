import { errorUserMessage } from "../Messages/index.message";
import calculateExpirationDate from "./calculateExpirationDate";
import { User, UserModel } from "../Models/user.model";



// ----------------------------------------- get remaining time -----------------------------------------


function getRemainingMinutes(userDate: number): number {
    return Math.floor((userDate - Date.now()) / (1000 * 60));
};


// ----------------------------------------- lock user login -----------------------------------------


async function lockUserLogin(user: UserModel) {
    const newFailedLoginAttempts = ++user.failedLoginAttempts;
    await User.updateOne({ _id: user._id }, { failedLoginAttempts: newFailedLoginAttempts }, { new: true });
    if (user.failedLoginAttempts >= Number(process.env.MAX_LOGIN_ATTEMPTS)) {
        if (user?.unlockLoginTime && (Date.now() > user.unlockLoginTime?.getTime())) {
            await User.updateOne({ _id: user._id }, { failedLoginAttempts: 1, logged: false, unlockLoginTime: null }, { new: true });
            return { isSuccess: false, path: "email or password", message: errorUserMessage.INVALID_DATA, numberOfFailedAttempts: 1, status: 401, };
        };
        const unlockLoginTime = calculateExpirationDate(process.env.LOCK_TIME);
        const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, { lastSeen: new Date(), logged: false, unlockLoginTime: unlockLoginTime }, { new: true });
        return { isSuccess: false, path: "email or password", message: `${errorUserMessage.MAX_5_LOGIN} ${getRemainingMinutes(updatedUser.unlockLoginTime.getTime())} minutes.`, numberOfFailedAttempts: user.failedLoginAttempts, status: 401, };
    };
    return { isSuccess: false, path: "email or password", message: errorUserMessage.INVALID_DATA, numberOfFailedAttempts: user.failedLoginAttempts, status: 401, };
};


// ----------------------------------------- unlock login time -----------------------------------------


async function unlockLoginTime(user: UserModel) {
    if (user.unlockLoginTime && user.unlockLoginTime.getTime() > Date.now()) return { isSuccess: false, path: "email or password", message: `${errorUserMessage.MAX_5_LOGIN} ${getRemainingMinutes(user.unlockLoginTime.getTime())} minutes.`, status: 401, };
    await User.updateOne({ _id: user._id }, { failedLoginAttempts: 0, unlockLoginTime: null }, { new: true });
    return { isSuccess: true, user: user, message: "Done.", status: 200 };
};


export default {
    lockUserLogin,
    unlockLoginTime,
};