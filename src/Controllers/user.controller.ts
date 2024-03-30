import { NextFunction, Request, Response } from "express";

import { sourcesService, tokenService, userService } from "../Services/index.service";
import { errorUserMessage, httpMessage, successUserMessage } from "../Messages/index.message";
import CustomError from "../Utils/customError.util";
import { createToken, httpCalls, loginHandler, pagination } from "../Utils/index.util";



// ----------------------------- register -----------------------------


const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { fullName, email, password } = req.body;
    try {
        const checkExistingEmail = await userService.getUserByEmail(email);
        if (checkExistingEmail && checkExistingEmail.email === email) throw new CustomError(errorUserMessage.emailExists, 406, "email");
        const newUser = await userService.createUser(fullName, email, password);
        const token = createToken(newUser, String(process.env.EXPIRESIN));
        await userService.updateLogged(newUser._id, true);
        await tokenService.saveToken(token.secretKey, token.token, newUser._id, token.expireDate)
        return res.status(201).send({ message: successUserMessage.created, user: newUser, token: token.token });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- login -----------------------------


const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await userService.getUserByEmail(email);
        if (!user) throw new CustomError(errorUserMessage.wrongCredentials, 401, "email or password");
        const isVerifyPassword = await userService.verifyPassword(user._id, password);
        if (!isVerifyPassword) {
            const result = await loginHandler.lockUserLogin(user); 7
            return res.status(result.status).send(result);
        };
        const result = await loginHandler.unlockLoginTime(user);
        if (!result.isSuccess) return res.status(result.status).send(result);
        const hasToken = await tokenService.getToken(user._id);
        if (!hasToken) {
            const token = createToken(user, String(process.env.EXPIRESIN));
            await userService.updateLogged(user._id, true);
            await tokenService.saveToken(token.secretKey, token.token, user._id, token.expireDate)
            return res.status(200).send({ user: user, message: successUserMessage.login, token: token.token });
        };
        return res.status(200).send({ user: user, message: successUserMessage.token, token: hasToken.token });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- logout -----------------------------


const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { secretKey } = req.token;
        const hasToken = await tokenService.stopToken(secretKey);
        const user = hasToken.active ? await userService.updateLogged(userId, false) : { path: 'UnAuthorized', statusCode: 401, message: 'invalid session', };
        return res.status(200).send({ user: user, message: successUserMessage.logout });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update user -----------------------------


const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { userName, email } = req.body;
        const user = await userService.updateUser(userId, userName, email);
        if (!user) throw new CustomError(errorUserMessage.notUpdated, 404, "user");
        return res.status(200).send({ user: user, message: successUserMessage.updated });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- update user password -----------------------------


const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { newPassword } = req.body;
        const user = await userService.updateUserPassword(userId, newPassword);
        if (!user) throw new CustomError(errorUserMessage.notUpdated, 404, "user");
        return res.status(200).send({ user: user, message: successUserMessage.updatedPassword });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- get profile -----------------------------


const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const user = await userService.getProfile(userId);
        if (!user) throw new CustomError(errorUserMessage.notFoundUser, 404, "user");
        return res.status(200).send({ user: user, message: successUserMessage.getProfile });
    } catch (err) {
        next(err)
    };
};


// ----------------------------- home screen -----------------------------

const getHomeInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const isSourceExisting = await sourcesService.getSubscriptionByUserId(userId);
        if (!isSourceExisting) return res.status(400).send({ message: errorUserMessage.haveNotSource });
        const getSubscribedSources = await httpCalls.fetchSubscribedSources(isSourceExisting.subscriptions);
        const allArticles = getSubscribedSources.flatMap(sourceData => sourceData.articles);
        const sourcesForCurrentPage = pagination(allArticles?.length, Number(req.query.page));
        const paginatedContent = allArticles.slice(sourcesForCurrentPage.skip, sourcesForCurrentPage.skip + sourcesForCurrentPage.limit);
        return res.status(201).send({ message: httpMessage.success, sources: { pagination: sourcesForCurrentPage, content: paginatedContent } });
    } catch (err) {
        next(err);
    };
};

export default {
    registerUser,
    loginUser,
    logoutUser,
    updateUser,
    updateUserPassword,
    getProfile,
    getHomeInfo,
};