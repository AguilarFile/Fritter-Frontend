import {request, Request, Response} from 'express';
import express from 'express';
import UserCollection from './collection';
import * as userValidator from '../user/middleware';
import * as groupValidator from '../group/middleware';
import GroupCollection from './collection';

const router = express.Router();

router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        groupValidator.isGroupNotExists
    ],
    async (req: Request, res: Response) => {
        const group = await GroupCollection.addOne(req.session.userId, req.body.content);
        res.status(201).json({
            message: `Your group ${req.params.group} was created successfully`,
            group: group
        });
    }
)

router.delete(
    '/:group?',
    [
        userValidator.isUserLoggedIn,
        groupValidator.isGroupExists
    ],
    async (req: Request, res: Response) => {
        const group = await GroupCollection.deleteOne(req.session.userId, req.body.group);
        res.status(201).json({
            message: `Your group ${req.body.group} was deleted successfully`,
            group: group
        });
    }
)

router.put(
    '/:group?/:name?',
    [
        userValidator.isUserLoggedIn,
        groupValidator.isGroupExists,
        groupValidator.isNameNotAlreadyInUse
    ],
    async (req: Request, res: Response) => {
        const group = await GroupCollection.updateOne(req.session.userId, req.body.group, req.body.name);
        res.status(200).json({
            message: `Your group name was changed to ${req.params.name} successfully`,
            group: group
        });
    }
)

router.get(
    '/:group?',
    [
        userValidator.isUserLoggedIn
    ],
    async (req: Request, res: Response) => {
        const groups = await GroupCollection.findAllByUser(req.session.userId);
        return res.status(200).json(groups);
    }
)

export {router as groupRouter};