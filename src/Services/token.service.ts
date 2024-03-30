import { Token, TokenModel } from "../Models/token.mode";



// ----------------------------- saved token -----------------------------


const saveToken = async (secterKey: string, token: string, userId: string, expiryTime: Date) => {
    const newToken: TokenModel = new Token({
        secretKey: secterKey,
        token: token,
        userId: userId,
        expiryTime: expiryTime,
        endTime: expiryTime,
        active: true,
    });
    await newToken.save();
    return newToken;
};


// ----------------------------- get token -----------------------------


const getToken = async (userId: string) => {
    const currentTime = new Date();
    const token: TokenModel = await Token.findOne({ userId: userId, active: true, expiryTime: { $gt: currentTime } });
    return token;
};


// ----------------------------- stop token -----------------------------


const stopToken = async (secretKey: string) => {
    const stoppedToken: TokenModel = await Token.findOneAndUpdate({ secretKey: secretKey }, { active: false, endTime: new Date() }, { new: true });
    return stoppedToken;
};



export default {
    saveToken,
    getToken,
    stopToken,
};