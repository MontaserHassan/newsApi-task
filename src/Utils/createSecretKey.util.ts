import * as crypto from 'crypto';

const generateSecretKey = (length: number): string => {
    const secretKey = crypto.randomBytes(length).toString('hex');
    return secretKey;
};


export default generateSecretKey;