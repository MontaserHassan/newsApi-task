import { ObjectId } from "mongoose";

import { Subscriptions } from "../Models/subscriptions.model";



// ----------------------------- get subscription by userId -----------------------------

const getSubscriptionByUserId = async (userId: ObjectId) => {
    const subscriptionDoc = await Subscriptions.findOne({ userId: userId.toString() });
    return subscriptionDoc;
};


// ----------------------------- add subscription -----------------------------


const addSubscription = async (userId: ObjectId, newSubscription: string) => {
    const updatedDoc = await Subscriptions.findOneAndUpdate({ userId: userId.toString() }, { $addToSet: { subscriptions: newSubscription } }, { new: true, upsert: true },);
    return updatedDoc;
};


// ----------------------------- delete subscription -----------------------------


const deleteSubscription = async (userId: ObjectId, subscription: string) => {
    const updatedDoc = await Subscriptions.findOneAndUpdate({ userId: userId.toString() }, { $pull: { subscriptions: subscription } }, { new: true });
    return updatedDoc;
};



export default {
    getSubscriptionByUserId,
    addSubscription,
    deleteSubscription,
};