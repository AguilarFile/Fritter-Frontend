import type {Request, Response} from 'express';
import express from 'express';
import ReactionCollection from './collection';
import WholesomeTagCollection from '../wholesomeTag/collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as reactionValidator from '../reaction/middleware';

const router = express.Router();

router.post(
    '/:freetId?/:type?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        reactionValidator.isReactionNotExists,
        reactionValidator.isValidReact
    ],
    async (req: Request, res: Response) => {
        const oldReaction = await ReactionCollection.findOne(req.session.userId, req.params.freetId);

        var reaction;
        if (oldReaction){
            reaction = await ReactionCollection.updateOne(req.session.userId, req.params.freetId, req.params.type);
        } else {
            reaction = await ReactionCollection.addOne(req.session.userId, req.params.freetId, req.params.type);
        }

        const allHeart = await ReactionCollection.findAll(req.params.freetId, 'heart');
        const allBrokenHeart = await ReactionCollection.findAll(req.params.freetId, 'broken-heart');
        
        if (allHeart.length > allBrokenHeart.length*4) {
            WholesomeTagCollection.addOne(req.params.freetId);
        } else {
            WholesomeTagCollection.deleteOne(req.params.freetId);
        }

        res.status(201).json({
            message: `You reacted to ${req.params.freetId} successfully`,
            reaction: reaction
        });
    }
)

 router.delete(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists,
        reactionValidator.isReactionExists
    ],
    async (req: Request, res: Response) => {
        await ReactionCollection.deleteOne(req.session.userId, req.params.freetId);
        res.status(200).json({
            message: `Your reaction to ${req.params.freetId} was removed successfully`,
        });
    }
)

router.get(
    '/:freetId?',
    [
        userValidator.isUserLoggedIn,
        freetValidator.isFreetExists
    ],
    async (req: Request, res: Response) => {
        const reaction = await ReactionCollection.findOne(req.session.userId, req.params.freetId);
        res.status(200).json(reaction);
    }
)

export {router as reactionRouter};