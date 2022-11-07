import type {HydratedDocument, Types} from 'mongoose';
import type {Reaction} from './model';
import ReactionModel from './model';

class ReactionCollection {
    static async addOne(user: Types.ObjectId | String, freet: Types.ObjectId | String, type: String): Promise<HydratedDocument<Reaction>> {
        const reaction = new ReactionModel({
            user,
            freet,
            type
        })
        await reaction.save();
        return reaction;
    }

    static async deleteOne(user: Types.ObjectId | String, freet: Types.ObjectId | String): Promise<Boolean> {
        const reaction = await ReactionModel.deleteOne({
            user: user,
            freet: freet
        })
        return reaction !== null
    }
    
    static async findOne(user: Types.ObjectId | String, freet: Types.ObjectId | String): Promise<HydratedDocument<Reaction>> {
        return await ReactionModel.findOne({
            user: user,
            freet: freet
        })
    }

    static async findAll(freet: Types.ObjectId | String, type: String): Promise<Array<HydratedDocument<Reaction>>> {
        return await ReactionModel.find({
            freet: freet,
            type: type
        })
    }

    static async updateOne(user: Types.ObjectId | String, freet: Types.ObjectId | String, type: String): Promise<HydratedDocument<Reaction>> {
        const reaction =  await ReactionModel.findOne({
            user: user,
            freet: freet,
        })
        reaction.type = type;
        await reaction.save();
        return reaction;
    }
}

export default ReactionCollection;