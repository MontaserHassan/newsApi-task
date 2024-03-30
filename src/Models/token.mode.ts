import mongoose, { ObjectId } from "mongoose";



interface TokenModel extends mongoose.Document {
    secretKey: string;
    token: string;
    userId: string;
    expiryTime: Date;
    active: boolean
};

const tokenSchema = new mongoose.Schema(
    {
        secretKey: {
            type: String,
            required: true,
            unique: true,
        },
        token: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        expiryTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);


const Token = mongoose.model<TokenModel>('token', tokenSchema);



export {
    Token,
    TokenModel,
};