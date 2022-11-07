import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import GroupPairCollection from '../groupPair/collection';
import GroupCollection from '../group/collection';
import UserCollection from '../user/collection';

const isGroupPairExists = async (req: Request, res: Response, next: NextFunction) => {
    const fromGroup = await GroupCollection.findOneByName(req.session.userId, req.params.group);
    const toUser = await UserCollection.findOneByUsername(req.params.author);
    const groupPair = await GroupPairCollection.findOne(fromGroup._id, toUser._id);
    if (!groupPair) {
        res.status(404).json({
        error: {
            user: `${req.params.author} is not part of ${req.params.group} group.`
        }
        });
        return;
    }
    next();
};

 const isGroupPairNotExists = async (req: Request, res: Response, next: NextFunction) => {
    const fromGroup = await GroupCollection.findOneByName(req.session.userId, req.params.group);
    const toUser = await UserCollection.findOneByUsername(req.params.author);
    const groupPair = await GroupPairCollection.findOne(fromGroup._id, toUser._id);
    if (groupPair) {
        res.status(409).json({
        error: {
            name: `${req.params.author} is already part of ${req.params.group} group.`
        }
        });
        return;
    }
    next();
};

export {
    isGroupPairExists,
    isGroupPairNotExists
}