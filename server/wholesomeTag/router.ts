import {Request, Response} from 'express';
import express from 'express';
import WholesomeTagCollection from './collection';

const router = express.Router();

router.get(
    '/',
    async (req: Request, res: Response) => {
        const response = await WholesomeTagCollection.findAll();
        res.status(200).json(response)
    }
)

export {router as wholesomeTagRouter};