import mongoose from "mongoose";
import bcrypt from "bcrypt";



interface UserModel extends mongoose.Document {
    fullName: string;
    email: string;
    password: string;
    unlockLoginTime: Date;
    failedLoginAttempts: number;
    lastSeen: Date;
    logged: boolean;
    verifyPassword(password: string): Boolean;
};

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        lastSeen: {
            type: Date,
        },
        logged: {
            type: Boolean,
        },
        unlockLoginTime: {
            type: Date,
        },
        failedLoginAttempts: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
            },
        },
    },
);


userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.verifyPassword = function verifyPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model<UserModel>('user', userSchema);



export {
    User,
    UserModel,
};