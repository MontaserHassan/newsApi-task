import { ObjectId } from "mongoose";
import { User, UserModel } from "../Models/user.model";



// ----------------------------- create user -----------------------------


const createUser = async (fullName: string, email: string, password: string) => {
    const newUser: UserModel = new User({
        fullName: fullName,
        email: email,
        password: password,
    });
    await newUser.save();
    return newUser;
};


// ----------------------------- get user by email -----------------------------


const getUserByEmail = async (email: string) => {
    const user: UserModel = await User.findOne({ email: email });
    return user;
};


// ----------------------------- update user -----------------------------


const updateUser = async (userId: ObjectId, fulName: string, email: string) => {
    const updatedUser: UserModel = await User.findByIdAndUpdate({ _id: userId }, {
        fulName: fulName,
        email: email,
    }, { new: true });
    return updatedUser;
};


// ----------------------------- update user -----------------------------


const updateUserPassword = async (id: ObjectId, newPassword: string) => {
    const updatedUser: UserModel = await User.findById(id);
    updatedUser.password = newPassword;
    await updatedUser.save();
    return updatedUser;
};


// ----------------------------- verify password -----------------------------


const verifyPassword = async (id: string, password: string) => {
    const user: UserModel = await User.findById(id);
    const isVerifyPassword = user.verifyPassword(password);
    return isVerifyPassword;
};



// ----------------------------- update logged -----------------------------


const updateLogged = async (userId: ObjectId, state: boolean) => {
    const user = await User.findByIdAndUpdate({ _id: userId }, { logged: state, lastSeen: Date.now() }, { new: true });
    return user;
};


// ----------------------------- get profile -----------------------------


const getProfile = async (userId: ObjectId) => {
    const user: UserModel = await User.findById(userId);
    return user;
};



export default {
    createUser,
    getUserByEmail,
    updateUser,
    updateUserPassword,
    verifyPassword,
    updateLogged,
    getProfile,
};