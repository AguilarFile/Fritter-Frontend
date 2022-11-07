import {request, Request, Response} from 'express';
import express from 'express';
import GroupPairCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as groupValidator from '../group/middleware';
import * as groupPairValidator from '../groupPair/middleware';
import * as followValidator from '../follow/middleware';
import GroupCollection from '../group/collection';

const router = express.Router();

router.post(
    '/:group?/:author?',
    [
        userValidator.isUserLoggedIn,
        userValidator.isAuthorExistsParams,
        groupValidator.isGroupExists,
        followValidator.isFollowExists,
        groupPairValidator.isGroupPairNotExists
    ],
    async (req: Request, res: Response) => {
        const fromGroup = await GroupCollection.findOneByName(req.session.userId, req.params.group);
        const toUser = await UserCollection.findOneByUsername(req.params.author);
        const bond = await GroupPairCollection.addOne(fromGroup._id, toUser._id);
        res.status(201).json({
            message: `${req.params.author} is successfully now a part of ${req.params.group}.`,
            bond: bond
        });
    }
)

router.delete(
    '/:group?/:author?',
    [
        userValidator.isUserLoggedIn,
        userValidator.isAuthorExistsParams,
        groupValidator.isGroupExists,
        groupPairValidator.isGroupPairExists
    ],
    async (req: Request, res: Response) => {
        const fromGroup = await GroupCollection.findOneByName(req.session.userId, req.params.group);
        const toUser = await UserCollection.findOneByUsername(req.params.author);
        const bond = await GroupPairCollection.deleteOne(fromGroup._id, toUser._id);
        res.status(201).json({
            message: `${req.params.author} has been successfully removed from ${req.params.group}.`,
            bond: bond
        });
    }
)

router.get(
    '/:group?/:author?',
    [
        userValidator.isUserLoggedIn,
        userValidator.isAuthorExistsParams,
        groupValidator.isGroupExists,
    ],
    async (req: Request, res: Response) => {
        const fromGroup = await GroupCollection.findOneByName(req.session.userId, req.params.group);
        const toUser = await UserCollection.findOneByUsername(req.params.author);
        const bond = await GroupPairCollection.findOne(fromGroup._id, toUser._id);
        res.status(200).json(bond);
    }
)

export {router as groupPairRouter};