import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import GroupCollection from '../group/collection';

const isGroupExists = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupCollection.findOneByName(req.session.userId, req.body.content);
  if (!group) {
    res.status(404).json({
      error: {
        groupNotFound: `User does not have group ${req.body.content}.`
      }
    });
    return;
  }
  next();
};

 const isGroupNotExists = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupCollection.findOneByName(req.session.userId, req.body.content);
  if (group) {
    res.status(409).json({
      error: {
        groupAlreadyExists: `User already has group ${req.body.content}.`
      }
    });
    return;
  }
  next();
};

const isNameNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
  const group = await GroupCollection.findOneByName(req.session.userId, req.body.name);

  if (!group || (group?.name === req.body.name)) {
    next();
    return;
  }

  res.status(409).json({
    error: {
      name: `A group with this name already exists.`
    }
  });
};

export {
    isGroupExists,
    isGroupNotExists,
    isNameNotAlreadyInUse
}