import type {Request, Response} from 'express';
import express from 'express';
import FollowCollection from './collection';
import UserCollection from '../user/collection';
import * as userValidator from '../user/middleware';
import * as followValidator from '../follow/middleware';


const router = express.Router();

router.post(
  '/:author?',
  [
    userValidator.isUserLoggedIn,
    userValidator.isAuthorExistsParams,
    followValidator.isFollowNotExists
  ],
  async (req: Request, res: Response) => {
      const toUser = await UserCollection.findOneByUsername(req.params.author as string);
      const follow = await FollowCollection.addOne(req.session.userId, toUser._id);

      res.status(201).json({
        message: `Your following was created successfully.`,
        follow: follow
      });
  }
);

 router.delete(
  '/:author?',
  [
    userValidator.isUserLoggedIn,
    userValidator.isAuthorExistsParams,
    followValidator.isFollowExists
  ],
  async (req: Request, res: Response) => {
    const toUser = await UserCollection.findOneByUsername(req.params.author as string);
    const follow = await FollowCollection.deleteOne(req.session.userId, toUser._id);

    res.status(201).json({
      message: 'Your following was deleted successfully.',
      follow: follow
    });
  }
);

router.get(
  '/:author?',
  [
    userValidator.isUserLoggedIn,
  ],
  async (req: Request, res: Response) => {
    const toUser = await UserCollection.findOneByUsername(req.params.author as string);
    const usersFollowing = await FollowCollection.findOne(req.session.userId, toUser._id);
    res.status(201).json(usersFollowing);
  }
)

export {router as followRouter};