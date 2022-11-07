import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import FollowCollection from '../follow/collection';
import UserCollection from '../user/collection';

/**
 * Checks if a user is following the other
 */
const isFollowExists = async (req: Request, res: Response, next: NextFunction) => {
    const toUser = await UserCollection.findOneByUsername(req.params.author as string);
    const follow = await FollowCollection.findOne(req.session.userId, toUser._id);
    if (!follow) {
        res.status(404).json({
        error: {
            followNotFound: `Follow from USER ID ${req.session.userId} to ${toUser._id} does not exist.`
        }
        });
        return;
    }
    next();
};

/**
 * Checks if a user is not following the other
 */
const isFollowNotExists = async (req: Request, res: Response, next: NextFunction) => {
    const toUser = await UserCollection.findOneByUsername(req.params.author as string);
    const follow = await FollowCollection.findOne(req.session.userId, toUser._id);
    if (follow) {
        res.status(409).json({
        error: {
            followAlreadyExists: `Follow from USER ID ${req.session.userId} to ${toUser._id} already exists.`
        }
        });
        return;
    }
    next();
};

export {
    isFollowExists,
    isFollowNotExists
}