import mongoose, { ObjectId } from "mongoose";



interface SubscriptionModel extends mongoose.Document {
    subscriptions: string[];
    userId: string;
};

const subscriptionsSchema = new mongoose.Schema(
    {
        subscriptions: {
            type: Array<String>,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


const Subscriptions = mongoose.model<SubscriptionModel>('subscriptions', subscriptionsSchema);



export {
    Subscriptions,
    SubscriptionModel,
};