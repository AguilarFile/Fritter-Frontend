import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import ReactionCollection from '../reaction/collection';

 const isReactionExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.freetId);
    const reaction = validFormat ? await ReactionCollection.findOne(req.session.userId, req.params.freetId) : '';
    if (!reaction) {
        res.status(404).json({
        error: {
            ReactionNotFound: `Reaction does not exists.`
        }
        });
        return;
    }
    next();
};

const isReactionNotExists = async (req: Request, res: Response, next: NextFunction) => {
    const validFormat = Types.ObjectId.isValid(req.params.freetId);
    const reaction = validFormat ? await ReactionCollection.findOne(req.session.userId, req.params.freetId) : '';
    if (reaction) {
        res.status(409).json({
            error: {
                ReactionAlreadyExists: `Reaction already exists.`
            }
        });
        return;
    }

    next();
};

const isValidReact = async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.type != 'heart' && req.params.type != 'broken-heart') {
        res.status(400).json({
            error: {
                userError: `type of reaction must either be heart or borken-heart (without quotations).`
            }
        });
        return;
    }

    next();
}

  export {
    isReactionExists,
    isReactionNotExists,
    isValidReact
  }