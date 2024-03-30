import jwt from 'jsonwebtoken';

import { UserModel } from '../Models/user.model';
import calculateExpirationDate from './calculateExpirationDate';
import generateSecretKey from './createSecretKey.util';



// -------------------------------------------- create token --------------------------------------------


function createToken(user: UserModel, expiresIn: string) {
    const expireDate = calculateExpirationDate(expiresIn);
    const expiresInMilliseconds = Math.floor((expireDate.getTime() - new Date().getTime()) / 1000);
    const secretKey = generateSecretKey(12)
    const token = jwt.sign({ id: user._id, secretKey: secretKey }, process.env.JWT_SECRET as string, { expiresIn: expiresInMilliseconds });
    return { token: token, expireDate: expireDate, secretKey: secretKey };
};



export default createToken;