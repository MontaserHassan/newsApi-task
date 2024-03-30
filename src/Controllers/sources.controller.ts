import { NextFunction, Request, Response } from "express";

import { httpCalls, pagination } from "../Utils/index.util";
import { SourceInterface } from '../Interfaces/index.interface';
import { sourcesService } from "../Services/index.service";
import { successSourceMessage, httpMessage, errorSourceMessage } from "../Messages/index.message";



// ----------------------------- get all sources -----------------------------


const fetchSources = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sources = await httpCalls.fetchAllSources() as SourceInterface;
        if (!req.query.page) return res.status(201).send({ message: httpMessage.success, sources: { pagination: 'false', content: sources.sources } });
        const sourcesForCurrentPage = pagination(sources?.sources.length, Number(req.query.page));
        const paginatedContent = sources?.sources.slice(sourcesForCurrentPage.skip, sourcesForCurrentPage.skip + sourcesForCurrentPage.limit);
        return res.status(201).send({ message: httpMessage.success, sources: { pagination: sourcesForCurrentPage, content: paginatedContent } });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- subscribe source -----------------------------


const subscribeSource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { source } = req.params;
        const { userId } = req.user;
        const isSourceExisting = await sourcesService.getSubscriptionByUserId(userId);
        if (isSourceExisting && isSourceExisting.subscriptions.includes(source)) return res.status(400).send({ message: successSourceMessage.alreadyExists });
        const response = await sourcesService.addSubscription(userId, source);
        if (!response) return res.status(400).send({ message: errorSourceMessage.doesNotUpdated });
        return res.status(201).send({ message: successSourceMessage.updated, response: response });
    } catch (err) {
        next(err);
    };
};


// ----------------------------- unSubscribe source -----------------------------


const unSubscribeSource = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { source } = req.params;
        const { userId } = req.user;
        const isSourceExisting = await sourcesService.getSubscriptionByUserId(userId);
        if (!isSourceExisting || !isSourceExisting.subscriptions.includes(source)) return res.status(400).send({ message: errorSourceMessage.notExisting });
        const response = await sourcesService.deleteSubscription(userId, source);
        if (!response) return res.status(400).send({ message: errorSourceMessage.doesNotUpdated });
        return res.status(201).send({ message: successSourceMessage.deleted, response: response });
    } catch (err) {
        next(err);
    };
};



export default {
    fetchSources,
    subscribeSource,
    unSubscribeSource,
};